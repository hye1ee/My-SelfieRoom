import '../css/style.css';
import '../css/all.css';
import Frame from './Frame.js';
import {useState} from 'react';

function Cut(props) {

  const [goframe, setGoframe] = useState(false);
  const [cuts, setCuts] = useState(0);
  const [data, setData] = useState({});

  const goFrame = () => {
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
            <div className="option" onClick={()=>setCuts(1)}>1 cut</div>
            <div className="option" onClick={()=>setCuts(2)}>2 cut</div>
            <div className="option" onClick={()=>setCuts(4)}>4 cut</div>
            <div className={"Button" + `${cuts?" Active":""}`} onClick={goFrame}>Go Frame</div>
        </div>
      }
    </div>
  );
}

export default Cut;
