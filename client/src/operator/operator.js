import React, { useState, useEffect } from 'react';
import Login from '../components/logIn';

function Operator() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/operator")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default Operator;
