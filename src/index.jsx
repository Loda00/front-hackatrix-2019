import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { BrowserRouter } from 'react-router-dom'
import './style.sass'


render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, document.getElementById('app'))