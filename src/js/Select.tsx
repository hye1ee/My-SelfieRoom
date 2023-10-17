import '../css/style.css';
import '../css/all.css';
import Filter from './Filter.js';
import {useState, useRef, useEffect, createRef} from 'react';

function Select(props) {

  const [gofilter, setGofilter] = useState(false);
  const [data, setData] = useState({...props.data, select:[]});
  const [select, setSelect] = useState([]);

  const canvasRefs = useRef([]);
  canvasRefs.current = Array(data.cuts+2).fill().map((e,idx)=>canvasRefs.current[idx] || createRef());

  useEffect(()=>{ //* put photo data for each canvas
    canvasRefs.current.map((ref, idx)=>{
      if(ref!==null){
        ref.current.getContext("2d").putImageData(props.data.images[idx],0,0);
      }
    })
  },[]);

  const goFilter = () => { //* call next component
    if(select.length == data.cuts){
      let tmp = data;
      tmp.select = select;
      setData(tmp);
      setGofilter(true);
    }
  }

  const photoClick = (idx) => { //* make a selected list in order
    if(select.includes(idx)){
      let tmp = select;
      tmp.splice(tmp.indexOf(idx),1,0)
      setSelect(tmp.filter(e=>e))
    }else if(select.length < data.cuts)setSelect([...select, idx])
  }

  
  return (
    <div className="Wrapper">
      {gofilter?
        <Filter setGomain={props.setGomain} data={data}/>:

        <div className="Content">
            <div className={`contentWrapper `+`margin${props.data.cuts}`}>
              <div className= "selectTitle">Select {data.cuts} photos</div>
              <div className="canvasWrapper">
                {canvasRefs.current.map((ref, idx) => {
                  return(
                    <div key={idx+1} onClick={()=>photoClick(idx+1)} className="canvasContent">
                      <div className={"selectNum"+`${select.includes(idx+1)?" Selected":""}`}>
                        {select.indexOf(idx+1)+1}
                      </div>
                      <canvas className={`photoCanvas cut${props.data.cuts}`} height={props.data.vertical?"1006":"674"} width={props.data.vertical?"735":"1002"} ref={ref}/>
                    </div>
                  )
                })}
              </div>
              <div className="selectButton" onClick={goFilter}>Choose filter</div>
            </div>
        </div>
      }
    </div>
  );
}

export default Select;
