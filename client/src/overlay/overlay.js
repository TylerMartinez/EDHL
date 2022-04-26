import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './overlay.css';

function Overlay() {
  const [data, setData] = useState(null);
 
  useEffect(() => {
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
      </header>
    </div>
  );
}

export default Overlay;
