import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './overlay.css';

const client = new WebSocket('ws://localhost:3001?pw=' + process.env.REACT_APP_DEVPW + '&ok=' + process.env.REACT_APP_OVERLAY_KEY);

function Overlay() {
  const [data, setData] = useState(null);
  const [connected, setConnected] = useState(null);
 
  useEffect(() => {
    client.onopen = () => { 
      console.log('WebSocket Client Connected');
      setConnected("Connected!")
    };
    client.onmessage = (message) => {
      console.log(message);
    };
    
    fetch("/api/overlay")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>This is the Overlay page bitch</p>
        <p>{!data ? "Loading..." : data}</p>
        <p>{!connected ? "Connecting to server..." : connected}</p>
      </header>
    </div>
  );
}

export default Overlay;
