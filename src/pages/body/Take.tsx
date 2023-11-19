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
import { useRecoilValue } from "recoil";
import { backgroundState } from "../../state/state";

const timerInterval = 1000; //ms
const timerRepeat = 20;

console.log("WHYWHYWHY");
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
  const [timer, setTimer] = useState<NodeJS.Timeout>();
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
  };

  // const createTimer = async () => {
  //   console.log("Create Timer");
  //   setCounter(timerRepeat);

  //   const timerId = setInterval(() => {
  //     if (counter > 0) setCounter((prevTimer) => prevTimer - 1);
  //   }, timerInterval);
  //   setTimer(timerId);

  //   setTimeout(() => {
  //     clearInterval(timerId);
  //   }, timerInterval * timerRepeat);
  // };

  useEffect(() => {
    console.log("use Effect here");
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
      if (maskVal == 1) maskVal = 0.9;

      for (let k = 0; k < 4; k++) {
        imageData[j + k] =
          backgroundData[j + k] * maskVal * (backgroundImg.src ? 1 : 0.8) +
          imageData[j + k] * (1 - maskVal);
      }
      j += 4;
    }
    // Draw segmented result
    const uint8Array = new Uint8ClampedArray(imageData.buffer);
    const dataNew = new ImageData(uint8Array, canvas.width, canvas.height);
    canvasCtx.putImageData(dataNew, 0, 0);

    window.requestAnimationFrame(canvasCallback);
    console.log("video callback");
  };

  const canvasCallback = async () => {
    if (!isCanvasValid()) return;

    if (video.currentTime === cameraTime) {
      window.requestAnimationFrame(canvasCallback);
      return;
    }
    cameraTime = video.currentTime;

    // Draw camera
    canvasCtx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    if (imageSegmenter === undefined || imageSegmenter === null) return;
    const startTimeMs = performance.now();

    // Call videoCallback
    imageSegmenter.segmentForVideo(video, startTimeMs, videoCallback);
    console.log("canvasCallback");
  };

  return (
    <>
      This is Take Step
      <ContentContainer>
        <FrameItem text={counter.toString()}>
          <video autoPlay={true} ref={videoRef} style={{ display: "none" }} />
          <canvas ref={canvasRef} width="640px" height="480px" />
        </FrameItem>
      </ContentContainer>
      <Button text="Next" active={true} onClick={props.onNext} />
    </>
  );
};
export default Take;
