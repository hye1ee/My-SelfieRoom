import '../css/style.css';
import '../css/all.css';
import Share from './Share.js';
import domtoimage from 'dom-to-image';
import {useState, useRef, useEffect, createRef} from 'react';

function Filter(props) {

  const classNames = ["oneCut", "twoCuts", "fourCuts"];
  const [goshare, setGoshare] = useState(false);
  const [data, setData] = useState({...props.data, dataurl : null});

  const canvasRefs = useRef([]);
  const photoWrapper = useRef(null);

  canvasRefs.current = Array(props.data.cuts).fill().map((e,idx)=>canvasRefs.current[idx] || createRef());

  const changeFilter = (filter) => { //* apply filter depend on user choice
    console.log('filter try')
    for(let i=0 ; i<data.cuts ; i++){
      window.Caman("#photoCanvas"+i, function () {
        this.revert();
        if(filter==1){
          this.brightness(-3);
          this.saturation(5);
          this.render();
        }
        else if(filter==2){
          this.greyscale();
          this.noise(5);
          this.render();
        }
        else if(filter==3){
          this.greyscale();
          this.brightness(-20);
          this.noise(10);
          this.render();
        }
      });
    }
  }

  const goShare = () => { //* change image div to jpeg data url and store to data object
    domtoimage.toJpeg(photoWrapper.current,{quality:1})
    .then((url)=>{
      let tmp = data;
      tmp.dataurl = url;
      setData(tmp);
      setGoshare(true);
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }


  useEffect(()=>{ //* put photo data for each canvas
    console.log(props.data.select);
    canvasRefs.current.map((ref, idx)=>{
      if(ref!==null){
        ref.current.getContext("2d").putImageData(props.data.images[props.data.select[idx]-1],0,0);
        ref.current.id = "photoCanvas"+idx;
      }
    })
  },[]);
  
  return (
    <div className="Wrapper">
      {goshare?
        <Share setGomain={props.setGomain} data = {data}/>:
        <div className="Content">
            <div className= "midTitle_ok">Choose the filter you want</div>
              <div className='box_f_ok_2'>
                <div className="display_ok">
                  <div className="photoFrame_f" ref={photoWrapper}>
                    <img className="photoBack" src={require(`../assets/frame${data.frame}.png`)}/>
                    <div className="photoItems">
                      {canvasRefs.current.map((ref, idx) => {
                        return(
                          <canvas key={idx} className={`${classNames[Math.floor(props.data.cuts/2)]}`} height={props.data.vertical?"1006":"674"} width={props.data.vertical?"735":"1002"} ref={ref}/>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className='box_f_ok'>
                  <div className = "grid_f_ok">
                      <div className="option_f_ok" onClick={()=>changeFilter(0)}>
                        <img className="filter_ok" src = {require("../assets/f1.png")}/>
                        <span className="text_f_ok">ORIGINAL</span>
                      </div>
                      <div className="option_f_ok" onClick={()=>changeFilter(1)}>
                        <img className="filter_ok" src = {require("../assets/f2.png")}/>
                        <span className="text_f_ok">DARK</span>
                      </div>
                      <div className="option_f_ok" onClick={()=>changeFilter(2)}>
                        <img className="filter_ok" src = {require("../assets/f3.png")}/>
                        <span className="text_f_ok">GRAY</span>
                      </div>
                      <div className="option_f_ok" onClick={()=>changeFilter(3)}>
                        <img className="filter_ok" src = {require("../assets/f4.png")}/>
                        <span className="text_f_ok">FILM</span>
                      </div>
                  </div>
                  <div className="Button_f_ok forhover" onClick={goShare}>Share Your Photo</div>
                </div>
              </div>
        </div>
      }
    </div>
  );
}

export default Filter;