import React from 'react';
import logo from './battle_pic.png';
import './App.css';
import AutoCompleteText from './AutoCompleteText'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Game of Thrones
        </p>
      </header>
      <div className="App-Component">
        <div className="App-Component">
          <AutoCompleteText />
        </div>
      </div>
    </div>
  );
}

export default App;
