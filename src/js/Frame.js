import '../css/style.css';
import '../css/all.css';
import Background from './Background.js';
import {useState} from 'react';

function Frame(props) {

  const [gobackground, setGobackground] = useState(false);
  const [data, setData] = useState(props.data);

  const changeFrame = (index) => {
    let tmp = data;
    tmp.frame = index;
    setData(tmp);
  }
  
  return (
    <div className="Wrapper">
      {gobackground?
        <Background setGomain={props.setGomain} data={data}/>:
        <div className="Content">
            <div>this is Frame page</div>
            <div >choose the frame</div>
            <div className="option" onClick={()=>changeFrame(1)}>option1</div>
            <div className="option" onClick={()=>changeFrame(2)}>option2</div>
            <div className="option" onClick={()=>changeFrame(3)}>option3</div>
            <div className="Button" onClick={()=>setGobackground(true)}>Go Background</div>
        </div>
      }
    </div>
  );
}

export default Frame;
