import '../css/style.css';
import Select from './Select.js';
import {useState, useRef, useEffect} from 'react';

import Webcam from "react-webcam";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { Camera } from "@mediapipe/camera_utils";

import testimage from '../assets/background1.png';
import testimage2 from '../assets/background2.png';

function Take(props) {

  const data = props.data;
  const [goselect, setGoselect] = useState(false);
  const [timer, setTimer] = useState(5);

  const [cuts, setCuts] = useState(data.cuts + 2);

  const [load, setLoad] = useState([false, false]);
  const [timerflag, setTimerflag] = useState(false);
  const [cameraflag, setCameraflag] = useState(false);

  const images = [];

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  let camera = null;
  let canvasContext = null;

  //-----------------------------------------------* 
  //* IMAGE FILELOAD *//
  //* onload is called continuously from first load, so set the load flag
  const img = new Image();
  img.src = testimage;
  img.onload = () =>{
    const tmp = [...load];
    tmp[0] = true;
    setLoad(tmp);
  }

  const img2 = new Image();
  img2.src = testimage2;
  img2.onload = () =>{
    const tmp = [...load];
    tmp[1] = true;
    setLoad(tmp);
  }

  images.push(img);
  images.push(img2);
  //-----------------------------------------------* 


  const takePhoto = () => {

  }
  
  //-----------------------------------------------* 
  //* TIMER SETTING *//
  //* use and set state in setInterval, setTimeout
  let startCount = null;
  const startTimer = () => {
    console.log(startCount);
    if(!timerflag){
      setTimerflag(true);
      startCount = setInterval(()=>setTimer(timer => timer-1), 1000);
    }

    if(!timer && cuts){
      takePhoto();
      setCuts(cuts => cuts-1);
      setTimer(5);
    }else if(!cuts) clearInterval(startCount);
  }

  useEffect(()=>{
    if(canvasRef !== null)console.log(canvasRef.current.getContext("2d")
    .getImageData(0, 0, canvasRef.current.width, canvasRef.current.height).data
    .some(channel => channel !== 0));

    if(images.length == load.filter((e)=>e==true).length && cameraflag){
      console.log('timer call');
      startTimer();
    }
  }, [load, timer, cameraflag])
  //-----------------------------------------------* 


  

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
    const selfieSegmentation = new SelfieSegmentation({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    }});
    selfieSegmentation.setOptions({
        selfieMode: true,
        modelSelection: 0,
    });
    selfieSegmentation.onResults(onResults);

    //* camera setting
    if(webcamRef.current !== null){
        camera = new Camera(webcamRef.current.video, {
            onFrame: async () => {
              await selfieSegmentation.send({image: webcamRef.current.video});
            },
            width: 800,
            height: 600
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
            <div>timer : {timer}</div>
            <div>remain cuts : {cuts}</div>
            <Webcam className="Webcam" mirrored={true} ref={webcamRef}/>
            <canvas height="600" width="800" ref={canvasRef}/>
            <div className="Button" onClick={()=>setGoselect(true)}>Go Select</div>
        </div>
      }
    </div>
  );
}

export default Take;
