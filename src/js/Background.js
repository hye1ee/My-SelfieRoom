import '../css/style.css';
import Take from './Take.js';
import {useState} from 'react';


function Background(props) {

  const [gotake, setGotake] = useState(false);
  const [data, setData] = useState(props.data);

  const changeBackground = (index) => {
    let tmp = data;
    tmp.background = index;
    setData(tmp);
  }

  
  return (
    <div className="Wrapper">
      {gotake?
        <Take setGomain={props.setGomain} data={data}/>:
        <div className="Content">
          
            <div>this is Background page</div>
            <div >choose the background</div>
            <div className="option" onClick={()=>changeBackground(0)}>option1</div>
            <div className="option" onClick={()=>changeBackground(1)}>option2</div>

            <div className="Button" onClick={()=>setGotake(true)}>Go Take</div>
        </div>
      }
    </div>
  );
}

export default Background;
