import '../css/style.css';
import '../css/all.css';
import Frame from './Frame.js';
import {useState} from 'react';

function Cut(props) {

  const [goframe, setGoframe] = useState(false);
  const [cuts, setCuts] = useState(0);
  const [data, setData] = useState({});

  const goFrame = () => {
    if(cuts){ //* if user select cuts, store the value and load frame component
      setData({cuts : cuts});
      setGoframe(true);
    }
  }
  
  return (
    <div className="Wrapper" id="cutbackground_ok">

      {goframe?
        <Frame setGomain={props.setGomain} data={data}/>:
        <div className="Content_ok">
            <div className= "midTitle_ok">How many photos do you want?</div>
            <div className = "grid_ok">
              <div className="option_ok" onClick={()=>setCuts(1)}>
                <img className="1cut_ok" src = {require("../assets/1cut.png")}/>
                <span className="text_ok">1 cut</span>
              </div>
              <div className="option_ok" onClick={()=>setCuts(2)}>
                <img className="2cuts_ok" src = {require("../assets/2cuts.png")}/>
                <span className="text_ok">2 cuts</span>
              </div>
              <div className="option_ok" onClick={()=>setCuts(4)}>
                <img className="4cuts_ok" src = {require("../assets/4cuts.png")}/>
                <span className="text_ok">4 cuts</span>
              </div>
            </div>
            <div className="Button_ok" id="cut_button_ok" onClick={goFrame}>Go Frame</div>
        </div>
      }
    </div>
  );
}

export default Cut;
