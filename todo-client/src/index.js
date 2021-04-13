
import './index.css'
import ReactDOM from 'react-dom'
import React from 'react'

import { Provider } from 'react-redux'
import configureStore from './store'

import App from './App'

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />,
  </Provider>,
  document.getElementById('root')
)