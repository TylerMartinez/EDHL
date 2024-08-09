import { useState } from 'react';
import styled from 'styled-components';
import Input from '../base/input';
import Button from '../base/button';

type LoginState = {
  className?: string;
  onSubmit: Function;
}

const LoginBase = ({className, onSubmit}: LoginState) => {
  const [userName, setUsername] = useState("Tyler");
  const [pw, setPw] = useState("sup")

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (userName !== "" && pw !== "" && e.charCode === 13) {
      onSubmit(userName, pw);
    }
  }

  return (
    <div className={className}>
      <p className="login-header">
        LOG IN:
      </p>
      <div>
        <Input placeholder='Username' onKeyPress={(e) => onKeyPress(e)} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <Input placeholder='Password' onKeyPress={(e) => onKeyPress(e)} onChange={(e) => setPw(e.target.value)}/>
      </div>
      <div>
        <Button disabled={userName === "" || pw === ""} onClick={() => onSubmit(userName, pw)}>SUBMIT</Button>
      </div>
    </div>
  );
}

const Login = styled(LoginBase)`
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  animation: flicker 1.5s infinite alternate;  

  .login-header{
    color: ${props => props.theme.text1};

    margin-top: 0px;
    margin-bottom: 10px;

    font-family: ${props => props.theme.font};
    font-size: 2em;
  }
`

export default Login;
