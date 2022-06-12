import '../css/style.css';
import '../css/all.css';
import Take from './Take.js';
import {useState} from 'react';


function Background(props) {

  const [gotake, setGotake] = useState(false);
  const [data, setData] = useState(props.data);
  const [background, setBackground] = useState(0);

  const goTake = () => {
    if(background){
      let tmp = data;
      tmp.background = background-1;
      setData(tmp);
      setGotake(true);
    }
  }
  
  return (
    <div className="Wrapper">
      {gotake?
        <Take setGomain={props.setGomain} data={data}/>:
        <div className="Content">
          
            <div>this is Background page</div>
            <div >choose the background</div>
            <div className="option" onClick={()=>setBackground(1)}>option1</div>
            <div className="option" onClick={()=>setBackground(2)}>option2</div>

            <div className={"Button" + `${background?" Active":""}`} onClick={()=>goTake()}>Go Take</div>
        </div>
      }
    </div>
  );
}

export default Background;
