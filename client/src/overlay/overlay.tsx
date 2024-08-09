import React, { useState } from 'react';
import styled from 'styled-components';
import TextFlash from '../components/overlay/textFlash';
import CommanderSelectionDisplay from '../components/overlay/commanderSelectionDisplay';
import MESSAGES from '../MESSAGES';
import './overlay.css';
import { CommanderSelectionState } from '../components/operator/commanderSelection';

type OverlayState = {
  className?: string;
}

function OverlayBase({className}: OverlayState) {
  const [connected, setConnected] = useState("");
  const [instants, updateInstants] = useState<React.ReactElement[]>([]);
  const [currentControl, setCurrentControl] = useState("");
  const [currentControlState, setCurrentControlState] = useState<CommanderSelectionState>({decklists: [] });

  const client = new WebSocket('ws://' + window.location.host + '?pw=sup&ok=yee');

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

  const handleCommand = (message: MessageEvent) => {
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
        setCurrentControlState({decklists: [] });
        break;
        
      case MESSAGES.SEND_STATE_UPDATE:
        setCurrentControlState(JSON.parse(text))
        break;

      default:
    }
  }  

  return (
    <div className={className}>
      {connected == null && "TRYING TO CONNECT IF THIS IS NOT CONNECTING SOME ONE IS ALREADY LOOKING AT THE OVERLAY, TRY AGAIN LATER"}
      <CommanderSelectionDisplay initialState={currentControlState} visible={currentControl === "commander_selection"}/>
      {instants}
    </div>
  );
}

const Overlay = styled(OverlayBase)`
`

export default Overlay;
