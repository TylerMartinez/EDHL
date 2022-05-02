import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../components/base/input';
import Button from './base/button';

const LoginBase = ({className}) => {
  const [userName, setUsername] = useState(null);
  const [pw, setPw] = useState(null)

  return (
    <div className={className}>
      <p className="login-header">
        LOG IN:
      </p>
      <div>
        <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div>
        <Input placeholder='Password' onChange={(e) => setPw(e.target.value)}/>
      </div>
      <div>
        <Button>SUBMIT</Button>
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

  .login-header{
    color: ${props => props.theme.text1};

    margin-top: 0px;
    margin-bottom: 10px;

    font-family: ${props => props.theme.font};
    font-size: 2em;
  }
`

export default Login;
