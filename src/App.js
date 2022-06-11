import Main from './js/Main.js';
import Cut from './js/Cut.js';

import './css/style.css';

import {useState} from 'react';

function App() {

  const [gomain, setGomain] = useState(true);
  
  return (
    <div className="App">
      {gomain?
        <Main setGomain={setGomain}/>:
        <Cut setGomain={setGomain} />
      }
    </div>
  );
}

export default App;
