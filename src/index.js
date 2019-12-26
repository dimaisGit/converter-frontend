import React from 'react';
import ReactDOM from 'react-dom';
import ReactCursorPosition from 'react-cursor-position';
import './index.css';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ReactCursorPosition>
    <App />
  </ReactCursorPosition>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();