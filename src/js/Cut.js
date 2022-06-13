import '../css/style.css';
import '../css/all.css';
import Frame from './Frame.js';
import {useState} from 'react';

function Cut(props) {

  const [goframe, setGoframe] = useState(false);
  const [data, setData] = useState({});

  const goFrame = (cuts) => {
    if(cuts==2){ //* go next step only if user made a selection
      setData({cuts : cuts, vertical : false});
      setGoframe(true);
    }else{
      setData({cuts : cuts, vertical : true});
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
              <div className="option_ok" onClick={()=>goFrame(1)}>
                <img className="1cut_ok" src = {require("../assets/1cut.png")}/>
                <span className="text_ok">1 cut</span>
              </div>
              <div className="option_ok" onClick={()=>goFrame(2)}>
                <img className="2cuts_ok" src = {require("../assets/2cuts.png")}/>
                <span className="text_ok">2 cuts</span>
              </div>
              <div className="option_ok" onClick={()=>goFrame(4)}>
                <img className="4cuts_ok" src = {require("../assets/4cuts.png")}/>
                <span className="text_ok">4 cuts</span>
              </div>
            </div>
        </div>
      }
    </div>
  );
}

export default Cut;
