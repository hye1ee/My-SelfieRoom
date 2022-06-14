import '../css/style.css';
import '../css/all.css';
import Select from './Select.js';
import {useState, useRef, useEffect} from 'react';

import Webcam from "react-webcam";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { Camera } from "@mediapipe/camera_utils";

function Take(props) {

  const TIMER = 3;

  const [goselect, setGoselect] = useState(false);
  const [timer, setTimer] = useState(TIMER);
  const [data, setData] = useState({...props.data, images:[]});

  const [cuts, setCuts] = useState(data.cuts+2);

  const [imageflag, setImageflag] = useState(false);
  const [timerflag, setTimerflag] = useState(false);
  const [cameraflag, setCameraflag] = useState(false);
  const [countinterval, setCountinterval] = useState(null);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  let camera = null;
  let canvasContext = null;

  const videoConstraints = {
    height:props.data.vertical?"1006":"674",
    width:props.data.vertical?"735":"1002",
    facingMode: "user"
  };

  //-----------------------------------------------* 
  //* IMAGE FILELOAD *//
  //* onload is called continuously from first load, so set the load flag
  const img = new Image();
  img.src = require(`../assets/${props.data.background}.png`);

  //-----------------------------------------------* 

  //* TAKE PHOTOS *//
  //* store the photo data
  const takePhoto = () => {
    canvasContext = canvasRef.current.getContext("2d");
    const photoData = canvasContext.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    let tmp = data;
    tmp.images.push(photoData);
    setData(tmp);
  }

  //* automatically move to next step
  useEffect(()=>{
    if(!cuts){
      setTimeout(()=>{
        setGoselect(true);
      },1000);
    }
  },[cuts])

  
  //-----------------------------------------------* 
  //* TIMER SETTING *//
  //* use and set state in setInterval, setTimeout
  let startCount = null;

  const startTimer = () => {
    if(!timerflag){
      setTimerflag(true);
      setCountinterval(setInterval(()=>setTimer(timer => timer-1), 1000));
    }
    if(!timer && cuts){
      takePhoto();
      setCuts(cuts => cuts-1);
      setTimer(TIMER);
    }
    if(!cuts){
      clearInterval(countinterval);
      setTimer(0);
    }
  }

  useEffect(()=>{
    console.log('effect');
    if(cameraflag && imageflag !== null){
      startTimer();
    }
  }, [imageflag, timer, cameraflag])
  //-----------------------------------------------* 


  const onResults = (results) => { //* execute continuously
    if(canvasRef!== null){

      canvasContext = canvasRef.current.getContext("2d");
      canvasContext.save();
    

      canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasContext.drawImage(results.segmentationMask, 0, 0,
                          canvasRef.current.width, canvasRef.current.height);
    
      //* draw on background
      canvasContext.globalCompositeOperation = 'source-out';
      if(img.complete){
        canvasContext.drawImage(img,  0, 0, canvasRef.current.width, canvasRef.current.height);
        setCameraflag(true);
      }else canvasContext.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      
      //* draw on detected face
      canvasContext.globalCompositeOperation = 'destination-atop';
      canvasContext.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
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
          height : props.data.vertical?"1006":"674",
          width : props.data.vertical?"735":"1002"
        });
      camera.start();
    }
  }, []);
  
  return (
    <div className="Wrapper">
      {goselect?
        <Select setGomain={props.setGomain} data={data}/>:
        <div className="Content">
            <div className='contentWrapper'>
              <div className= "selectTitle flexRow">
                <div>Let's take {cuts} selfies!</div>
                <div className="timerText">{timer}</div>
              </div>
              <div className= "cameraWrapper">
                <Webcam videoConstraints={videoConstraints} height={props.data.vertical?"1006":"674"} width={props.data.vertical?"735":"1002"}className="Webcam" mirrored={true} ref={webcamRef}/>
                <canvas className={props.data.vertical?"cameraVertical":"cameraHorizontal"} height={props.data.vertical?"1006":"674"} width={props.data.vertical?"735":"1002"} ref={canvasRef}/>
              </div>  

            </div>

        </div>
      }
    </div>
  );
}

export default Take;
