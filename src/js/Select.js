import '../css/style.css';
import '../css/all.css';
import Filter from './Filter.js';
import {useState} from 'react';

function Select(props) {

  const [gofilter, setGofilter] = useState(false);
  
  return (
    <div className="Wrapper">
      {gofilter?
        <Filter setGomain={props.setGomain}/>:
        <div className="Content">
            <div>this is Select page</div>
            <div className="Button" onClick={()=>setGofilter(true)}>Go Filter</div>
        </div>
      }
    </div>
  );
}

export default Select;
