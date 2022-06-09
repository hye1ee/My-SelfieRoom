import '../css/style.css';
import Select from './Select.js';
import {useState} from 'react';

function Take(props) {

  const [goselect, setGoselect] = useState(false);
  
  return (
    <div className="Wrapper">
      {goselect?
        <Select setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Take page</div>
            <div className="Button" onClick={()=>setGoselect(true)}>Go Select</div>
        </div>
      }
    </div>
  );
}

export default Take;
