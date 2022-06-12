import '../css/style.css';
import '../css/all.css';
import Background from './Background.js';
import {useState} from 'react';

function Frame(props) {

  const [gobackground, setGobackground] = useState(false);
  const [data, setData] = useState(props.data);
  const [frame, setFrame] = useState(0);

  const goBackground = () => {
    if(frame){ //* go next step only if user made a selection
      let tmp = data;
      tmp.frame = frame;
      setData(tmp);
      setGobackground(true);
    }
  }
    
  return (
    <div className="Wrapper">
      {gobackground?
        <Background setGomain={props.setGomain} data={data}/>:
        <div className="Content">
            <div>this is Frame page</div>
            <div >choose the frame</div>
            <div className="option" onClick={()=>setFrame(1)}>option1</div>
            <div className="option" onClick={()=>setFrame(2)}>option2</div>
            <div className="option" onClick={()=>setFrame(3)}>option3</div>
            <div className={"Button" + `${frame?" Active":""}`} onClick={()=>goBackground()}>Go Background</div>
        </div>
      }
    </div>
  );
}

export default Frame;
