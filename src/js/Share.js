import '../css/style.css';
import '../css/all.css';

import React, { useState, useRef, useEffect } from 'react';
import storage from "./Firebase.js"
import { ref, getDownloadURL, uploadString } from "firebase/storage"
import Kakao from './KakaoShare.js'

function Share(props) {

  const canvasRef = useRef(null);
  const [load, setLoad] = useState(false);
  const newImage = new Image();
  newImage.src = image;
  newImage.onload = () => setLoad(true);

  useEffect(()=>{
    if(canvasRef !== null && load){

      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.drawImage(newImage,0,0,canvasRef.current.width, canvasRef.current.height);

      const storageRef = ref(storage, 'test.png');

      uploadString(storageRef, canvasRef.current.toDataURL(), 'data_url').then((snapshot) => {
        console.log('Uploaded!');
      });

      getDownloadURL(ref(storage, 'test.png')).then((url) => {
        //console.log(url);
        localStorage.setItem('firebase URL', JSON.stringify(url));
      });

    }
  },[load]);
  
  return (
    <div className="Content">
        <div>this is Share page</div>
        <Kakao />
        <div className="Button" onClick={()=>props.setGomain(true)}>Return Main</div>
    </div>
  );
}

export default Share;
