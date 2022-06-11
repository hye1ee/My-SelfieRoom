import '../css/style.css';
import Filter from './Filter.js';
import {useState, useRef, useEffect} from 'react';

function Select(props) {

  const [gofilter, setGofilter] = useState(false);
  const canvas1 = useRef(null);
  const canvas2 = useRef(null);

  useEffect(()=>{
    if(canvas1!==null && canvas2!==null){
      canvas1.current.getContext("2d").putImageData(props.data.images[0],0,0);
      canvas2.current.getContext("2d").putImageData(props.data.images[1],0,0);
    }
  },[]);

  
  return (
    <div className="Wrapper">
      {gofilter?
        <Filter setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Select page</div>
            <canvas height="600" width="800"  ref={canvas1} />
            <canvas height="600" width="800"  ref={canvas2} />
            <div className="Button" onClick={()=>setGofilter(true)}>Go Filter</div>
        </div>
      }
    </div>
  );
}

export default Select;
