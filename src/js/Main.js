import '../css/style.css';

function Main(props) {
  
  return (
    <div className="Main">
        this is main
        <div className="Button" onClick={()=>props.setGomain(false)}>Start Button</div>
    </div>
  );
}

export default Main;
