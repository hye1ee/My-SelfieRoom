import '../css/style.css';
import '../css/all.css';
import Share from './Share.js';
import {useState, useRef, useEffect, createRef} from 'react';

function Filter(props) {

  const classNames = ["oneCut", "twoCuts", "fourCuts"];
  const [goshare, setGoshare] = useState(false);

  const canvasRefs = useRef([]);
  canvasRefs.current = Array(props.data.cuts).fill().map((e,idx)=>canvasRefs.current[idx] || createRef());

  useEffect(()=>{ //* put photo data for each canvas
    console.log(props.data.select);
    canvasRefs.current.map((ref, idx)=>{
      if(ref!==null){
        ref.current.getContext("2d").putImageData(props.data.images[props.data.select[idx]-1],0,0);
        console.log(ref.current.offsetHeight,ref.current.offsetWidth);
      }
    })
  },[]);
  
  return (
    <div className="Wrapper">
      {goshare?
        <Share setGomain={props.setGomain} data = {props.data}/>:
        <div className="Content">
            <div>this is Filter page</div>
            <div className="photoFrame">
              <div className="photoItems">
                {canvasRefs.current.map((ref, idx) => {
                  return(
                    <canvas key={idx} className={`${classNames[Math.floor(props.data.cuts/2)]}`}  width={props.data.vertical?"600":"800"} height={props.data.vertical?"800":"600"}ref={ref}/>
                  )
                })}
              </div>
            </div>
            <div className="Button" onClick={()=>setGoshare(true)}>Go Share</div>
        </div>
      }
    </div>
  );
}

export default Filter;
