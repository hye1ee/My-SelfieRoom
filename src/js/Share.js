import '../css/style.css';
import '../css/all.css';

import React, { useState, useRef, useEffect } from 'react';

import { ref, getDownloadURL, uploadString } from "firebase/storage"
import { ref as dataRef, get, child, set } from "firebase/database"
import Kakao from './KakaoShare.js'
import { storage, database } from './Firebase.js';

import domtoimage from "dom-to-image";
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
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.putImageData(props.data.images[0],0,0, 0, 0, props.data.images[0].width, props.data.images[0].height);
      setImageready(true);
    }
    if(imagekey && imageready){
      const storageRef = ref(storage, `MySelfieRoom_${imagekey}.png`);

      uploadString(storageRef, canvasRef.current.toDataURL(), 'data_url').then((snapshot) => {
        console.log('Uploaded!');

        getDownloadURL(ref(storage, `MySelfieRoom_${imagekey}.png`)).then((url) => {

          set(dataRef(database, 'num'), imagekey+1); //* update number of files
          localStorage.setItem('url',url);
          kakao.createButton();
        });
      });
    }
  },[imagekey, imageready]);


  const onDownloadBtn = () => {
    domtoimage
    .toPng(canvasRef.current.toDataURL())
    .then(saveAs(canvasRef.current.toDataURL(), 'myselfieroom.png'));
  };
  
  return (
    <div className="Content">
        <div>this is Share page</div>
        <canvas  height="600" width="800" ref={canvasRef} />
        <button className='downBtn' onClick={onDownloadBtn}>Download Photo</button>
        <button id="kakao-link-btn" className="Button" >Kakao Share</button>
        <div className="Button" onClick={()=>props.setGomain(true)}>Return Main</div>
    </div>
  );
}

export default Share;
