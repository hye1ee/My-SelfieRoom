import '../css/style.css';
import '../css/all.css';
import Take from './Take.js';
import {useState} from 'react';


function Background(props) {

  const [gotake, setGotake] = useState(false);
  const [data, setData] = useState(props.data);
  const [background, setBackground] = useState(0);
  const [srcDir,setSrcDir]=useState(require("../assets/ex1.png"));

  const goTake = () => {
    if(background){
      let tmp = data;
      tmp.background = background-1;
      setData(tmp);
      setGotake(true);
    }
  }
  
  const setOption = (background,imgDir) => {
    setBackground(background);
    setSrcDir(imgDir);
  }



  return (
    <div className="Wrapper">
      {gotake?
        <Take setGomain={props.setGomain} data={data}/>:
        <div className="Content">
            <div className= "midTitle_ok">Choose the background you want</div>
            <div className="display_ok">
              <img className="leftPic_ok" src = {require(`../assets/frame${props.data.frame}.png`)}/>
              <img className="back_ok" src = {srcDir}/>            
            </div>
            <div className = "grid_ok_2">
              <div className="option_ok_2" onClick={()=>setOption(1, require('../assets/ex1.png'))}>
                <img className="frame1_ok" src = {require("../assets/back1.png")}/>              
              </div>
              
              <div className="option_ok_2" onClick={()=>setOption(2, require('../assets/ex2.png'))}>
                <img className="frame1_ok" src = {require("../assets/back2.png")}/>              
              </div>
              
              <div className="option_ok_2" onClick={()=>setOption(3, require('../assets/ex3.png'))}>
                <img className="frame1_ok" src = {require("../assets/back3.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(4, require('../assets/ex4.png'))}>
                <img className="frame1_ok" src = {require("../assets/back4.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(5, require('../assets/ex5.png'))}>
                <img className="frame1_ok" src = {require("../assets/back5.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(6, require('../assets/ex6.png'))}>
                <img className="frame1_ok" src = {require("../assets/back6.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(7, require('../assets/ex7.png'))}>
                <img className="frame1_ok" src = {require("../assets/back7.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(8, require('../assets/ex8.png'))}>
                <img className="frame1_ok" src = {require("../assets/back8.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(9, require('../assets/ex9.png'))}>
                <img className="frame1_ok" src = {require("../assets/back9.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(10, require('../assets/ex10.png'))}>
                <img className="frame1_ok" src = {require("../assets/back10.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(11, require('../assets/ex11.png'))}>
                <img className="frame1_ok" src = {require("../assets/back11.png")}/>              
              </div>

              <div className="option_ok_2" onClick={()=>setOption(12, require('../assets/ex12.png'))}>
                <img className="frame1_ok" src = {require("../assets/back12.png")}/>              
              </div>

            </div>


            <div className="Button_ok" onClick={goTake}>Go Take pictures!</div>
        </div>
      }
    </div>
  );
}

export default Background;
