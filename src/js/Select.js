import '../css/style.css';
import Filter from './Filter.js';
import {useState, useRef, useEffect, createRef} from 'react';

function Select(props) {

  const [gofilter, setGofilter] = useState(false);
  const [data, setData] = useState(props.data);

  const canvasRefs = useRef([]);
  canvasRefs.current = Array(data.cuts).fill().map((e,idx)=>canvasRefs.current[idx] || createRef());

  useEffect(()=>{
    canvasRefs.current.map((ref, idx)=>{
      if(ref!==null)ref.current.getContext("2d").putImageData(props.data.images[idx],0,0);
    })
  },[]);

  
  return (
    <div className="Wrapper">
      {gofilter?
        <Filter setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Select page</div>
            <div>
              {canvasRefs.current.map((ref, idx) => {
                return <canvas key={idx} height="600" width="800" ref={ref} />
              })}
            </div>
            <div className="Button" onClick={()=>setGofilter(true)}>Go Filter</div>
        </div>
      }
    </div>
  );
}

export default Select;
