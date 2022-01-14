import React from 'react';
import './App.css';

//firebase sdk
import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase,initializeApp({
  apiKey: "AIzaSyABGAm_r4_UF87pBaXsvz3XVJjuh2e2k08",
  authDomain: "superchat-e36dc.firebaseapp.com",
  projectId: "superchat-e36dc",
  storageBucket: "superchat-e36dc.appspot.com",
  messagingSenderId: "802305068752",
  appId: "1:802305068752:web:1fc500d0b977d9c23bd8d5",
  measurementId: "G-PKNT051DKE"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
