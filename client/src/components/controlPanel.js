import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './base/button';
import CommandButton from './base/commandButton';
import Input from './base/input';
import TextFlashInstant from './textFlashInstant';

const ControlPanelBase = ({className, client}) => {
  const [currentControl, setCurrentControl] = useState("");

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
          <CommandButton>
            Commander Select
          </CommandButton>
          <CommandButton>
            Card Spotlight
          </CommandButton>
        </div>
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

  .controls-header{
    color: ${props => props.theme.text1};

    text-align: center;

    margin-top: 0px;
    margin-bottom: 10px;

    font-family: ${props => props.theme.font};
    font-size: 2em;
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
`

export default ControlPanel;
