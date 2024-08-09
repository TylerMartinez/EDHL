import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../base/input';
import Button from '../base/button';
import MESSAGES from '../../MESSAGES'

type TextFlashInstantProps = {
  className?: string;
  client: WebSocket;
}

const TextFlashInstantBase = ({className, client}: TextFlashInstantProps) => {
  const [message, setMessage] = useState("");

  const onSubmit = () => {
    client.send(MESSAGES.SEND_TEXT_FLASH + message)
    setMessage("")
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      onSubmit();
    }
  }

  return (
    <div className={className}>
      <p className="controls-sub-header">
        Text Flash
      </p>
      <div>
        <Input maxLength={150} value={message} onKeyPress={(e) => onKeyPress(e)} onChange={(e) => setMessage(e.target.value)}/>
      </div>
      <div>
        <Button disabled={message === ""} onClick={() => onSubmit()}>
          SUBMIT
        </Button>
      </div>
    </div>
  );
}

const TextFlashInstant = styled(TextFlashInstantBase)`
  border: 1px;
  border-color: ${props => props.theme.highlight1};


  .controls-sub-header{
    color: ${props => props.theme.text1};

    text-align: center;

    margin-top: 0px;
    margin-bottom: 10px;

    font-family: ${props => props.theme.font};
    font-size: 1em;
  }
`

export default TextFlashInstant;
