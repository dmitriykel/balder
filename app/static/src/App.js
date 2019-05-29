import React from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');

axios.get("http://127.0.0.1:3000/balder/api/v1.0/gifts", {
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  }
})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Eit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
