import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './operator.css';

function Operator() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/operator")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>LMAO</p>
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default Operator;
