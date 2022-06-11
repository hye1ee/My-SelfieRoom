import '../css/style.css';
import Background from './Background.js';
import {useState} from 'react';

function Frame(props) {

  const [gobackground, setGobackground] = useState(false);
  console.log(props.data);
  
  return (
    <div className="Wrapper">
      {gobackground?
        <Background setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Frame page</div>
            <div className="Button" onClick={()=>setGobackground(true)}>Go Background</div>
        </div>
      }
    </div>
  );
}

export default Frame;
