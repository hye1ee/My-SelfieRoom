/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import { BodyProps } from "./type";
import ContentContainer from "../../components/ContentContainer";
import FrameItem from "../../components/FrameItem";
import {
  FilesetResolver,
  ImageSegmenter,
  ImageSegmenterResult,
} from "@mediapipe/tasks-vision";
import { getBackgroundName } from "./utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { backgroundState, takeState } from "../../state/state";

const timerInterval = 1000; //ms
const timerRepeat = 24;

let canvas: HTMLCanvasElement;
let video: HTMLVideoElement;
let canvasCtx: any;
let imageSegmenter: ImageSegmenter;
let backgroundImg: HTMLImageElement;
let cameraTime: number;

const Take = (props: BodyProps) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  // const [cameraTime, setCameraTime] = useState<number>(-1);
  const [counter, setCounter] = useState<number>(-1);
  const [take, setTake] = useRecoilState(takeState);
  const background = useRecoilValue(backgroundState);

  const isCanvasValid = () => {
    if (canvasRef == null || canvasRef.current == null) return false;
    canvas = canvasRef.current;
    canvasCtx = canvas.getContext("2d");
    return true;
  };

  // ----------------------------------
  // [1] Initial setting for segmenting
  // ----------------------------------

  const createImageSegmenter = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm"
    );

    imageSegmenter = await ImageSegmenter.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      outputCategoryMask: true,
      outputConfidenceMasks: false,
    });
  };

  const createVideoStream = async () => {
    if (videoRef == null) return;
    video = videoRef.current as any;

    video.srcObject = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.addEventListener("loadeddata", canvasCallback);
    // after video is ready
    createTimer();
  };

  const removeVideoStream = () => {
    if (video) {
      const stream = video.srcObject as MediaStream;
      const tracks = stream?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      video.srcObject = null;
    }
  };

  const createTimer = async () => {
    setCounter(timerRepeat);

    const timerId = setInterval(() => {
      setCounter((val) => Math.max(0, val - 1));
    }, timerInterval);

    setTimeout(() => {
      clearInterval(timerId);
    }, timerInterval * timerRepeat);
  };

  useEffect(() => {
    backgroundImg = new Image();
    const backgroundName = getBackgroundName(background);
    if (backgroundName !== null)
      backgroundImg.src = require(
        `../../assets/background/${getBackgroundName(background)}`
      );
    createImageSegmenter();
    createVideoStream();
  }, []);

  // ----------------------------------
  // [2] Add callback for video stream
  // ----------------------------------

  const videoCallback = (result: ImageSegmenterResult) => {
    if (!isCanvasValid()) return;

    // Get current camear data
    const imageData = canvasCtx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;
    // Draw background if the background selection exist
    if (backgroundImg !== undefined && backgroundImg.src) {
      canvasCtx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    }
    const backgroundData = canvasCtx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    const maskResult = result.categoryMask as any;
    const mask: number[] = maskResult.getAsFloat32Array();
    // // Make mask border smooth
    // for (let i = 0; i < 2; i++) {
    //   for (let j = 0; j < mask.length; j++) {
    //     if (j + 1 < mask.length) mask[j] = (mask[j] + mask[j + 1]) / 2;
    //   }
    // }

    let j = 0;
    for (let i = 0; i < mask.length; ++i) {
      let maskVal = mask[i];
      if (maskVal == 1) maskVal = 0.98;

      imageData[j] = backgroundData[j] * maskVal + imageData[j] * (1 - maskVal);
      imageData[j + 1] =
        backgroundData[j + 1] * maskVal + imageData[j + 1] * (1 - maskVal);
      imageData[j + 2] =
        backgroundData[j + 2] * maskVal + imageData[j + 2] * (1 - maskVal);
      imageData[j + 3] =
        backgroundData[j + 3] * maskVal + imageData[j + 3] * (1 - maskVal);

      j += 4;
    }
    // Draw segmented result
    const uint8Array = new Uint8ClampedArray(imageData.buffer);
    const dataNew = new ImageData(uint8Array, canvas.width, canvas.height);
    canvasCtx.putImageData(dataNew, 0, 0);

    window.requestAnimationFrame(canvasCallback);
  };

  const canvasCallback = async () => {
    if (!isCanvasValid()) return;

    // Capture Photo
    setCounter((prev) => {
      if (prev % 5 === 0) {
        // do capture
        const captureFlag =
          canvasCtx
            .getImageData(0, 0, canvas.width, canvas.height)
            .data.reduce((sum: number, curr: number, idx: number) => {
              if (idx % 4 === 3) return sum;
              else return sum + curr;
            }, 0) !== 0;
        if (captureFlag) {
          updateCaptureData(canvas.toDataURL());
        }

        canvasCtx.fillStyle = "black";
        canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
        if (prev !== 0) window.requestAnimationFrame(canvasCallback);
        else removeVideoStream();
      } else {
        // execute callback
        if (video.currentTime === cameraTime) {
          window.requestAnimationFrame(canvasCallback);
        } else {
          cameraTime = video.currentTime;

          // Draw camera
          canvasCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

          if (imageSegmenter !== undefined && imageSegmenter !== null) {
            const startTimeMs = performance.now();
            // Call videoCallback
            imageSegmenter.segmentForVideo(video, startTimeMs, videoCallback);
          }
        }
      }

      return prev;
    });
  };

  const updateCaptureData = (url: string) => {
    setTake((prev) => {
      if (prev === null) return [url];
      else return [...prev, url];
    });
  };

  const getCounterText = (counter: number) => {
    if (counter === -1) {
      return "Setting up the Camera📸";
    } else if (counter % 5 === 0) {
      return "Cheese🧀!";
    } else {
      return "Capturing in " + (counter % 5) + " secs";
    }
  };

  return (
    <>
      <ContentContainer>
        <FrameItem text={getCounterText(counter)} input={false}>
          {counter !== 0 && (
            <video autoPlay={true} ref={videoRef} style={{ display: "none" }} />
          )}
          <canvas ref={canvasRef} width="640px" height="480px" />
        </FrameItem>
      </ContentContainer>
      {take?.length === 5 && (
        <Button text="Next" active={true} onClick={props.onNext} />
      )}
    </>
  );
};
export default Take;
