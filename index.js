import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './app'

const GlobalStyle = createGlobalStyle`
  *, *::after, *::before {
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    margin: 0;
    padding: 35px;
    background-color: #c7f5f5d9;
  }
  `

const el = document.getElementById('app')
ReactDOM.render(
  <Router>
    <GlobalStyle />
    <App />
  </Router>,
  el
)
