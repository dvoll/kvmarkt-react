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


const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

db.collection("Schemes")
  .get()
  .then((querySnapshot: any) => {
    querySnapshot.forEach((doc: any) => {
      console.log(`${doc.id}`, doc.data());
  });
});

const catRef = db.collection('scheme_categories').doc('1');

db.collection('Schemes')
  .where('place', '==', catRef.id)  
  .get()
  .then( (r: any) => {
    r.forEach((n: any) => console.log('row', n.data()))
  })
  .catch( (err: any) => console.error(err) );