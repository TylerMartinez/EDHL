import React, { useState } from 'react';
import styled from 'styled-components';
import TextFlash from '../components/overlay/textFlash';
import CommanderSelectionDisplay from '../components/overlay/commanderSelectionDisplay';
import MESSAGES from '../MESSAGES';
import './overlay.css';

function OverlayBase({className}) {
  const [connected, setConnected] = useState(null);
  const [instants, updateInstants] = useState([]);
  const [currentControl, setCurrentControl] = useState("");
  const [currentControlState, setCurrentControlState] = useState({});

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
    const command = message.data.split('@#')[0] + '@#'
    const text = message.data.split('@#')[1]

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

      case MESSAGES.OPEN_COMMANDER_SELECTION:
        setCurrentControl("commander_selection");
        break;

      case MESSAGES.SEND_CLEAR_STATE:
        setCurrentControl("");
        setCurrentControlState({});
        break;
        
      case MESSAGES.SEND_STATE_UPDATE:
        setCurrentControlState(JSON.parse(text))
        break;

      default:
    }
  }  

  return (
    <div className={className}>
      <CommanderSelectionDisplay intialState={currentControlState} visible={currentControl === "commander_selection"}/>
      {instants}
    </div>
  );
}

const Overlay = styled(OverlayBase)`
`

export default Overlay;
