import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { BrowserRouter } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import firebase from 'firebase/compat/app';
import { createStore, combineReducers, compose } from 'redux';
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
  apiKey: "AIzaSyB-bCMennJnf38WwPjePhWadmmd-R6Fh9o",
  authDomain: "flashcard-17c74.firebaseapp.com",
  databaseURL: "https://flashcard-17c74-default-rtdb.firebaseio.com",
  projectId: "flashcard-17c74",
  storageBucket: "flashcard-17c74.appspot.com",
  messagingSenderId: "88415478135",
  appId: "1:88415478135:web:4a8b72fe577cc511028172",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>, 
document.getElementById('root'));
