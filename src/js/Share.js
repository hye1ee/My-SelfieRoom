import '../css/style.css';
import '../css/all.css';

import React, { useState, useRef, useEffect } from 'react';

import { ref, getDownloadURL, uploadString } from "firebase/storage"
import { ref as dataRef, get, child, set } from "firebase/database"
import Kakao from './KakaoShare.js'
import { storage, database } from './Firebase.js';

function Share(props) {

  const canvasRef = useRef(null);

  const dbRef = dataRef(database);
  const kakao = new Kakao();
  const [imagekey, setImagekey] = useState(0);
  const [imageready, setImageready] = useState(false);
  
  useEffect(()=>{
    get(child(dbRef, 'num')).then((snapshot) => { //* get current number of files to set storage url
      if (snapshot.exists()){
        setImagekey(parseInt(snapshot.val()))
      }
    }).catch((error) => console.error(error));

    if(canvasRef !== null){
      canvasRef.current.width = canvasRef.current.clientWidth;
      canvasRef.current.height = canvasRef.current.clientHeight;


      const finalImage = new Image();
      finalImage.src = props.data.dataurl;
      finalImage.onload = () => {
        canvasRef.current.getContext("2d").drawImage(finalImage,0,0);
        setImageready(true);
      }
    }
    if(imagekey && imageready){
      const storageRef = ref(storage, `MySelfieRoom_${imagekey}.png`);

      uploadString(storageRef, props.data.dataurl, 'data_url').then((snapshot) => {
        console.log('Uploaded!');

        getDownloadURL(ref(storage, `MySelfieRoom_${imagekey}.png`)).then((url) => {

          set(dataRef(database, 'num'), imagekey+1); //* update number of files
          localStorage.setItem('url',url);
          kakao.createButton();
        });
      });
    }
  },[imagekey, imageready]);
  
  return (
    <div className="Content">
        <div>this is Share page</div>
        <canvas className="photoFrame" ref={canvasRef} />
        <button id="kakao-link-btn" className="Button" >Hey</button>
        <div className="Button" onClick={()=>props.setGomain(true)}>Return Main</div>
    </div>
  );
}

export default Share;
