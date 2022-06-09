import '../css/style.css';
import Take from './Take.js';
import {useState} from 'react';

function Background(props) {

  const [gotake, setGotake] = useState(false);
  
  return (
    <div className="Wrapper">
      {gotake?
        <Take setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Background page</div>
            <div className="Button" onClick={()=>setGotake(true)}>Go Take</div>
        </div>
      }
    </div>
  );
}

export default Background;
