import React, { useState } from 'react';
import styled from 'styled-components';
import TextFlash from '../components/overlay/textFlash';
import MESSAGES from '../MESSAGES';
import './overlay.css';

function OverlayBase({className}) {
  const [connected, setConnected] = useState(null);
  const [instants, updateInstants] = useState([]);

  const client = new WebSocket('ws://localhost:3001?pw=' + process.env.REACT_APP_DEVPW + '&ok=' + process.env.REACT_APP_OVERLAY_KEY);

  client.onopen = () => { 
    console.log('WebSocket Client Connected');
    setConnected("Connected!")
  };

  client.onmessage = (message) => {
    console.log(message);
    handleCommand(message);
  };
 
  const removeInstant = () => {
    updateInstants( instants => instants.slice(1))
  }

  const handleCommand = (message) => {
    const command = message.data.split('@')[0] + '@'
    const text = message.data.split('@')[1]

    switch(command) {
      case MESSAGES.SEND_TEXT_FLASH:
        let top = (Math.random() * (75 - 25) + 25).toString() + "%"
        let left = (Math.random() * (75 - 25) + 25).toString() + "%"
        updateInstants( instants => [...instants, 
          <TextFlash 
          timeout={5000} 
          onCompletion={() => removeInstant()} 
          text={text}
          top={top}
          left={left}/>
        ])
        break;

      default:
    }
  }  

  return (
    <div className={className}>
      {instants}
    </div>
  );
}

const Overlay = styled(OverlayBase)`
`

export default Overlay;
