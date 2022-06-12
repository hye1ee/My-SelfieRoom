import '../css/style.css';
import '../css/all.css';
import Share from './Share.js';
import {useState} from 'react';

function Filter(props) {

  const [goshare, setGoshare] = useState(false);
  
  return (
    <div className="Wrapper">
      {goshare?
        <Share setGomain={props.setGomain} data = {props.data}/>:
        <div className="Content">
            <div>this is Filter page</div>
            <div className="Button" onClick={()=>setGoshare(true)}>Go Share</div>
        </div>
      }
    </div>
  );
}

export default Filter;
