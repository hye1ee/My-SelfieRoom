import '../css/style.css';
import '../css/all.css';
import Select from './Select.js';
import {useState, useRef, useEffect} from 'react';

import Webcam from "react-webcam";
import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";
import { Camera } from "@mediapipe/camera_utils";

import testimage from '../assets/background1.png';
import testimage2 from '../assets/background2.png';

function Take(props) {

  const [goselect, setGoselect] = useState(false);
  const [timer, setTimer] = useState(2);
  const [data, setData] = useState({...props.data, images:[]});

  const [cuts, setCuts] = useState(data.cuts+2);

  const [load, setLoad] = useState([false, false]);
  const [timerflag, setTimerflag] = useState(false);
  const [cameraflag, setCameraflag] = useState(false);
  const [countinterval, setCountinterval] = useState(null);

  const images = [];

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  let camera = null;
  let canvasContext = null;

  const videoConstraints = {
    height : props.data.vertical?800:600,
    width: props.data.vertical?600:800,
    facingMode: "user"
  };

  //-----------------------------------------------* 
  //* IMAGE FILELOAD *//
  //* onload is called continuously from first load, so set the load flag
  const img = new Image();
  img.src = testimage;
  img.onload = () =>{
    if(!load[0]){
      const tmp = [...load];
      tmp[0] = true;
      setLoad(tmp);
    }
  }

  const img2 = new Image();
  img2.src = testimage2;
  img2.onload = () =>{
    if(!load[1]){
      const tmp = [...load];
      tmp[1] = true;
      setLoad(tmp);
    }
  }

  images.push(img);
  images.push(img2);
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
      setTimer(2);
    }
    if(!cuts){
      clearInterval(countinterval);
      setTimer(0);
    }
  }

  useEffect(()=>{
    console.log('effect', cameraflag, images.length, load.filter((e)=>e==true).length);
    if(cameraflag && images.length == load.filter((e)=>e==true).length){
      startTimer();
    }
  }, [load, timer, cameraflag])
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
        if(images.length==2){
          canvasContext.drawImage(images[data.background],  0, 0, canvasRef.current.width, canvasRef.current.height);
          setCameraflag(true);
        }
        
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
          height: props.data.vertical?800:600,
          width: props.data.vertical?600:800
        });
      camera.start();
    }
  }, []);
  
  return (
    <div className="Wrapper">
      {goselect?
        <Select setGomain={props.setGomain} data={data}/>:
        <div className="Content">
            <div>this is Take page</div>
            <div>timer : {timer}</div>
            <div>remain cuts : {cuts}</div>
            <Webcam videoConstraints={videoConstraints} height={props.data.vertical?"800":"600"} width={props.data.vertical?"600":"800"} className="Webcam" mirrored={true} ref={webcamRef}/>
            <canvas height={props.data.vertical?"800":"600"} width={props.data.vertical?"600":"800"} ref={canvasRef}/>
        </div>
      }
    </div>
  );
}

export default Take;
