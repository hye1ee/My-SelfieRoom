import '../css/style.css';
import '../css/all.css';

import React, { useState, useRef, useEffect } from 'react';

import { ref, getDownloadURL, uploadString } from "firebase/storage"
import Kakao from './KakaoShare.js'

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmGEuxBYTyZG1f2KxHSdWiYDsnckC8sSY",
    authDomain: "myselfieroom-7285b.firebaseapp.com",
    projectId: "myselfieroom-7285b",
    storageBucket: "myselfieroom-7285b.appspot.com",
    messagingSenderId: "931739053338",
    appId: "1:931739053338:web:667eb921db3797d2bc90a3"
};
  
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function Share(props) {

  const [test, setTest] = useState(false);
  const canvasRef = useRef(null);
  console.log(props.data.images);
  
  useEffect(()=>{
    if (localStorage.getItem('firebase URL')){
      localStorage.removeItem('firebase URL');
    }

    if(canvasRef !== null){

      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.putImageData(props.data.images[0],0,0, 0, 0, props.data.images[0].width, props.data.images[0].height);

      const storageRef = ref(storage, 'test5.png');

      uploadString(storageRef, canvasRef.current.toDataURL(), 'data_url').then((snapshot) => {
        console.log('Uploaded!');
      });

      getDownloadURL(ref(storage, 'test5.png')).then((url) => {
        console.log(url);
        localStorage.setItem('firebase URL', JSON.stringify(url));
        setTest(true);
      });

    }
  },[]);
  
  return (
    <div className="Content">
        <div>this is Share page</div>
        <canvas  height="600" width="800" ref={canvasRef} />
        <Kakao test={test}/>
        <div className="Button" onClick={()=>props.setGomain(true)}>Return Main</div>
    </div>
  );
}

export default Share;
