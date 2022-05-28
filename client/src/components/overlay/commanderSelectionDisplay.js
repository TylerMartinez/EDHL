import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from '../base/select';
import Option from '../base/option';
import MESSAGES from '../../MESSAGES'

const CommanderSelectionDisplayBase = ({ className, intialState, visible }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    setState(intialState)
  }, [intialState])

  return (
    <div className={className}>
      <div className={visible ? "fade-in main": "fade-out main"}>
        <p className="controls-header">
          Commander Selection
        </p>
      </div>
    </div>
  );
}

const CommanderSelectionDisplay = styled(CommanderSelectionDisplayBase)`
  .main {
    background-color: ${props => props.theme.bg1};
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0%;
  }


  .fade-in { 
    animation-name: FadeIn;
    animation-duration: 3s;
    transition-timing-function: linear;
    animation-fill-mode: forwards;
  }

  .fade-out { 
    animation-name: FadeOut;
    animation-duration: 3s;
    transition-timing-function: linear;
    animation-fill-mode: forwards;
  }
`

export default CommanderSelectionDisplay;
