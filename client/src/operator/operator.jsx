import React, { useState } from 'react';
import Login from '../components/operator/logIn';
import styled from 'styled-components';
import ControlPanel from '../components/operator/controlPanel';

function OperatorBase({className}) {
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(null);

  const onSubmit = (username, pw) => {
    var temp = new WebSocket('ws://' + window.location.host +'?pw=' + pw + '&username=' + username);

    temp.onopen = () => { 
      console.log('WebSocket Client Connected');
      setConnected(true)
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
