import '../css/style.css';
import '../css/all.css';
import Frame from './Frame.js';
import {useState} from 'react';

function Cut(props) {

  const [goframe, setGoframe] = useState(false);
  const [data, setData] = useState({});

  const goFrame = (cuts) => {
    if(cuts){ //* go next step only if user made a selection
      setData({cuts : cuts});
      setGoframe(true);
    }
  }
  
  return (
    <div className="Wrapper">
      {goframe?
        <Frame setGomain={props.setGomain} data={data}/>:
        <div className="Content">
            <div>this is Cut page</div>
            <div >How many photos do you want?</div>
            <div className="option" onClick={()=>goFrame(1)}>1 cut</div>
            <div className="option" onClick={()=>goFrame(2)}>2 cut</div>
            <div className="option" onClick={()=>goFrame(4)}>4 cut</div>
        </div>
      }
    </div>
  );
}

export default Cut;
