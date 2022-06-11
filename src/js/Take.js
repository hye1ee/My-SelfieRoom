import '../css/style.css';
import Select from './Select.js';
import {useState, useRef, useEffect} from 'react';

import Webcam from "react-webcam";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { Camera } from "@mediapipe/camera_utils";

import testimage from '../assets/background1.png';
import testimage2 from '../assets/background2.png';

function Take(props) {

  const [goselect, setGoselect] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const data = props.data;
  console.log(data);

  let camera = null;
  let canvasContext = null;
  let selfieSegmentation = null;
  const images = [];

  //* image fileload
  const img = new Image();
  img.src = testimage;
  img.onload = () => images.push(img);

  const img2 = new Image();
  img2.src = testimage2;
  img2.onload = () => images.push(img2);
  
  const onResults = (results) => { //* execute continuously
    //console.log('result');
    if(canvasRef!== null){
        canvasContext = canvasRef.current.getContext("2d");
        canvasContext.save();

        canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasContext.drawImage(results.segmentationMask, 0, 0,
                            canvasRef.current.width, canvasRef.current.height);
      
        //* draw on background
        canvasContext.globalCompositeOperation = 'source-out';
        if(images.length==2)canvasContext.drawImage(images[data.background],  0, 0, canvasRef.current.width, canvasRef.current.height);
        
        //* draw on detected face
        canvasContext.globalCompositeOperation = 'destination-atop';
        canvasContext.drawImage(
            results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        canvasContext.restore();
    }
  }

  useEffect(() => {
    //* facemesh basic setting
    selfieSegmentation = new SelfieSegmentation({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    }});
    selfieSegmentation.setOptions({
        selfieMode: true,
        modelSelection: 1,
    });
    selfieSegmentation.onResults(onResults);

    //* camera setting
    if(webcamRef.current !== null){
        camera = new Camera(webcamRef.current.video, {
            onFrame: async () => {
              await selfieSegmentation.send({image: webcamRef.current.video});
            },
            width: 2000,
            height: 1000
          });
        camera.start();
    }
  }, []);
  
  return (
    <div className="Wrapper">
      {goselect?
        <Select setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Take page</div>
            <Webcam className="Webcam" mirrored={true} ref={webcamRef}/>
            <canvas ref={canvasRef}/>
            <div className="Button" onClick={()=>setGoselect(true)}>Go Select</div>
        </div>
      }
    </div>
  );
}

export default Take;
