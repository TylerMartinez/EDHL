import { useEffect, useState } from 'react';
import styled from 'styled-components';

type TextFlashState = {
  className?: string;
  text: string; 
  timeout: number; 
  onCompletion: Function;
  top: string;
  left: string;
}

const TextFlashBase = ({
  className, 
  text, 
  timeout, 
  onCompletion,
}: TextFlashState) => {
  const [timeoutSet, setTimeoutSet] = useState(false);

  useEffect(() => {
    if(!timeoutSet) {
      setTimeout(() => {onCompletion()}, timeout)
      setTimeoutSet(true)
    }
  }, [timeout, onCompletion, timeoutSet])

  return (
    <div className={className}>
      <div className='line'>
        <p className='pop-outin'>{text}</p>
      </div>
    </div>
  );
}

const TextFlash = styled(TextFlashBase)`
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};

  /* clear background */
  p {
    text-align: center;
    padding: 16px;
    margin: 0;

    color: ${props => props.theme.text1};

    font-family: ${props => props.theme.font};
    font-size: 3em;
  }

  /* crops animations that exceeds one line area */
  .line {
    padding: 0;
  }

  /* subtle zoom to attention and then back */
  .pop-outin {
    animation: ${props => props.theme.textFlashTime} anim-popoutin ease 1;
  }

  @keyframes anim-popoutin {
    0% {
      color: ${props => props.theme.textFlashBase};
      transform: scale(0);
      opacity: 0;
      text-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
    25% {
      color: ${props => props.theme.textFlashHighlight};
      transform: scale(2);
      opacity: 1;
      text-shadow: 3px 10px 5px rgba(0, 0, 0, 0.5);
    }
    50% {
      color: ${props => props.theme.textFlashBase};
      transform: scale(1);
      opacity: 1;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
    }
    100% {
      /* animate nothing to add pause at the end of animation */
      transform: scale(1);
      opacity: 1;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0);
    }
  }
`

export default TextFlash;
