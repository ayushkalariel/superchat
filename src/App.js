import React from 'react';
import './App.css';

//firebase sdk
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
