import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './assets/fonts/SaucerBB.ttf';
import './assets/fonts/CrosshatcherD.otf';
import './assets/fonts/CabinSketch-Regular.ttf';
import './assets/fonts/CabinSketch-Bold.ttf';
import './assets/fonts/KingthingsScrybbledot.ttf';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
