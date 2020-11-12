import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBg-grYYN_cf8JFduNFAoP6fb4eYXAnHPI",
  authDomain: "dnd-db-f79c9.firebaseapp.com",
  databaseURL: "https://dnd-db-f79c9.firebaseio.com",
  projectId: "dnd-db-f79c9",
  storageBucket: "dnd-db-f79c9.appspot.com",
  messagingSenderId: "1000533025228",
  appId: "1:1000533025228:web:d47732ede7e91fa2f7bd69"
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
