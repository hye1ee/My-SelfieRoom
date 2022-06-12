import '../css/style.css';
import '../css/all.css';

import React, { useState, useRef, useEffect } from 'react';
import storage from "./Firebase.js"
import { ref, getDownloadURL, uploadString } from "firebase/storage"
import Kakao from './KakaoShare.js'

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

      const storageRef = ref(storage, 'test.png');

      uploadString(storageRef, canvasRef.current.toDataURL(), 'data_url').then((snapshot) => {
        console.log('Uploaded!');
      });

      getDownloadURL(ref(storage, 'test.png')).then((url) => {
        console.log(url);
        localStorage.setItem('firebase URL', JSON.stringify(url));
        setTest(true);
      });

    }
  },[]);
  
  return (
    <div className="Content">
        <div>this is Share page</div>
        <canvas ref={canvasRef} />
        <Kakao test={test}/>
        <div className="Button" onClick={()=>props.setGomain(true)}>Return Main</div>
    </div>
  );
}

export default Share;
