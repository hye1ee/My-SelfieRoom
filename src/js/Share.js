import '../css/style.css';
import '../css/all.css';

import React, { useState, useRef, useEffect } from 'react';

import { ref, getDownloadURL, uploadString } from "firebase/storage"
import { ref as dataRef, get, child, set } from "firebase/database"
import Kakao from './KakaoShare.js'
import { storage, database } from './Firebase.js';

import { saveAs } from 'file-saver';

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
        canvasRef.current.getContext("2d").drawImage(finalImage,0,0)
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
        }).catch((e)=>console.error(e));
      }).catch((e)=>console.error(e));
      
      
    }
  },[imagekey, imageready]);


  const downloadImage = () => saveAs(props.data.dataurl, 'myselfieroom.png');
  
  return (
    <div className="Content">
      <div className= "midTitle_ok">Share it to your friends!</div>
        <div className='box_ok'>
          <canvas className="photoFrame adjust" ref={canvasRef} />        
          <div className='box_ok_2 hhhh'>
            <div id="kakao-link-btn" className='button_div' >
              <img className="roundbutton_ok" src = {require("../assets/share.png")}/>
              Share to Kakaotalk
            </div>
            <div className='button_div' onClick={downloadImage}>
              <img className="roundbutton_ok" src = {require("../assets/download.png")}/>
              Download in a device
            </div>
            <div className="Button_ok_2 sharebutton forhover" onClick={()=>props.setGomain(true)}>Return Main</div>
          </div>
        </div>      
    </div>
  );
}

export default Share;
