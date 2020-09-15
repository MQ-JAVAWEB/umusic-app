import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import "./assets/css/iconfont.css"

import "./assets/css/reset.css"
import "./assets/js/index"
import "antd-mobile/dist/antd-mobile.css"
import store from "./store/index"
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import "./assets/css/common.css"

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
    </Provider>
  ,
  document.getElementById('root')
);
