import '../css/style.css';
import '../css/all.css';

function Main(props) {
  
  return (
    <div className="Main">
        <div className="Title_ok">MYSELFIEROOM</div>
        <div className="Button_ok" id="main_button_ok" onClick={()=>props.setGomain(false)}>START</div>
    </div>
  );
}

export default Main;
