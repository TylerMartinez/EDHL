import React, { useState } from 'react';
import Login from '../components/logIn';
import styled from 'styled-components';
import ControlPanel from '../components/controlPanel';

function OperatorBase({className}) {
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(null);

  const onSubmit = (username, pw) => {
    var temp = new WebSocket('ws://localhost:3001?pw=' + pw + '&username=' + username);

    temp.onopen = () => { 
      console.log('WebSocket Client Connected');
      setConnected(true)
    };
    temp.onmessage = (message) => {
      console.log(message)
    };

    setClient(temp)
  }

  return (
    <div className={className}>

      {!connected && <Login onSubmit={onSubmit}/>}

      {connected && <ControlPanel client={client}/>}

    </div>
  );
}

const Operator = styled(OperatorBase)`
`

export default Operator;
