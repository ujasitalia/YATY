import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
