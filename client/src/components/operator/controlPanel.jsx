import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CommandButton from '../base/commandButton';
import Button from '../base/button';
import TextFlashInstant from './textFlashInstant';
import MESSAGES from '../../MESSAGES';
import CommanderSelection from './commanderSelection';

const ControlPanelBase = ({className, client}) => {
  const [currentControl, setCurrentControl] = useState("");
  const [currentControlState, setCurrentControlState] = useState({});

  const onCommanderSelectClick = () =>{
    client.send(MESSAGES.OPEN_COMMANDER_SELECTION)
  }

  const onClearClick = () =>{
    client.send(MESSAGES.SEND_CLEAR_STATE)
    setCurrentControl("")
    setCurrentControlState({})
  }

  useEffect(() => {
    client.onmessage = (message) => {
      console.log(message)

      const command = message.data.split('!#')[0] + "!#"
      const data = JSON.parse(message.data.split('!#')[1])

      switch(command) {
        case MESSAGES.PLAYER_DECKS:
          setCurrentControlState(
            {
              decklists: data.decklists
            }
          )
          setCurrentControl("commanderSelection")
          break;

        case MESSAGES.UPDATE_STATE:
          setCurrentControlState(data)
          break;

        case MESSAGES.CLEAR_STATE:
          setCurrentControl("")
          setCurrentControlState({})
          break;
        
        default:
      }
    }
  }, [client])

  return (
    <div className={className}>
      <p className="controls-header">
        Control Panel
      </p>

      {currentControl === "" &&
        <div>
          <CommandButton>
            League Standings
          </CommandButton>
          <CommandButton onClick={() => onCommanderSelectClick()}>
            Commander Select
          </CommandButton>
          <CommandButton>
            Card Spotlight
          </CommandButton>
        </div>
      }

      {currentControl !== "" && 
        <div className='clear-state'>
          <Button onClick={() => onClearClick()}>CLEAR SCREEN</Button>
        </div>
      }

      {currentControl === "commanderSelection" &&
        <CommanderSelection intialState={currentControlState} client={client}/>
      }

      <div className='instants'>
        <p className="controls-sub-header">
          Instants
        </p>
        <div className='instant-drawer'>
          <TextFlashInstant client={client}/>
        </div>
      </div>
    </div>
  );
}

const ControlPanel = styled(ControlPanelBase)`

  .instants{
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .controls-sub-header{
    color: ${props => props.theme.text1};

    text-align: center;

    margin-top: 0px;
    margin-bottom: 10px;

    font-family: ${props => props.theme.font};
    font-size: 1em;
  }

  .instant-drawer{

  }

  .clear-state {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`

export default ControlPanel;
