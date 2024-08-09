import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Operator from './operator/operator.js';
import Overlay from './overlay/overlay.js';
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import baseTheme from './themes/base_theme.js';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => window.location.pathname === '/overlay' ? 'rgba(0,0,0,0)' : props.theme.bg1};
    text-align: center;
  }

  .controls-header{
    color: ${props => props.theme.text1};

    text-align: center;

    margin-top: 0px;
    margin-bottom: 10px;

    font-family: ${props => props.theme.font};
    font-size: 2em;
  }  
`
function renderApp() {
  if(window.location.pathname === '/overlay')
     return <Overlay/>;

  if(window.location.pathname === '/operator')
     return <Operator/>;
  
  return <p>fuck</p>;
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={baseTheme}>
      <GlobalStyle/>
      { renderApp() }
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);