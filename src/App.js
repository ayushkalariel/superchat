import React, { useRef, useState } from 'react';
import './App.css';

//firebase sdk
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

//hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
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
const analytics = firebase.analytics();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut/>
      </header>

      <section>
        {user ? <ChatRoom/> : <SignIn/>}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  ) 
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {

  const dummy = useRef();
  
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();                                                               //to prevent the page from refreshing

    const { uid } = auth.currentUser;                                         //Grabs uid from currently ogged in user

    await messagesRef.add({                                                           //creates a new document in the databse                 
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid
    });

    setFormValue('')                                                                  //resetting form value back to an empty string

    dummy.current.scrollIntoView({ behavior: 'smooth'});
  }


  return(
    <>
      <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

        <button type="submit">Send</button>

      </form>

    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return(<>
    <div className={'message ${messageClass}'}>
      <img src={'https://api.adorable.io/avatars/23/abott@adorable.png'}/>
      <p>{text}</p>
    </div>
  </>)
}

export default App;
