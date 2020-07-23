import React, { useState } from 'react';
import Nav from './Components/Nav/Nav';
import routes from './routes';
import './reset.css';
import './App.css';

function App() {

  const [register, setRegister] = useState(false);

  return (
    <div>
      {register === false
      ? <div>
          <Nav setRegisterFn={setRegister} />
          {routes}
        </div>
      : <div>
          <button onClick={() => setRegister(false)} >return</button>
          {routes}
        </div>
      }
      
    </div>
  );
}

export default App;
