import { useState } from 'react';
import Login from '../components/operator/logIn';
import styled from 'styled-components';
import ControlPanel from '../components/operator/controlPanel';

type OperatorState = {
  className?: string;
}

function OperatorBase({className}: OperatorState) {
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState<WebSocket | null>(null);

  const onSubmit = (username: string, pw: string) => {
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

      {connected && <ControlPanel client={client!}/>}

    </div>
  );
}

const Operator = styled(OperatorBase)`
`

export default Operator;
