import '../css/style.css';

function Share(props) {
  
  return (
    <div className="Content">
        <div>this is Share page</div>
        <div className="Button" onClick={()=>props.setGomain(true)}>Return Main</div>
    </div>
  );
}

export default Share;
