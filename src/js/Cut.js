import '../css/style.css';
import Frame from './Frame.js';
import {useState} from 'react';

function Cut(props) {

  const [goframe, setGoframe] = useState(false);
  
  return (
    <div className="Wrapper">
      {goframe?
        <Frame setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Cut page</div>
            <div className="Button" onClick={()=>setGoframe(true)}>Go Frame</div>
        </div>
      }
    </div>
  );
}

export default Cut;
