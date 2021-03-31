import React from 'react';
import ReactDOM from 'react-dom';
import App from './shared/App';
import store from "./redux/configStore";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

