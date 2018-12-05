import "normalize-css";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';



import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import configureStore from "./configureStore";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

// fire.initializeApp(firebaseConfig);
