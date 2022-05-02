import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Operator from './operator/operator';
import Overlay from './overlay/overlay';
import reportWebVitals from './reportWebVitals'; 
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import baseTheme from './themes/base_theme';


const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.bg1};
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
