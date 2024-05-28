// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

//api key should be hidden in .env file but for now it is here
const firebaseConfig = {

    apiKey: "AIzaSyAbvNPZfcp0DvOgAVXsRGhsvXU4ZxS91n8",
    authDomain: "sveltechatapp-654ce.firebaseapp.com",
    projectId: "sveltechatapp-654ce",
    storageBucket: "sveltechatapp-654ce.appspot.com",
    messagingSenderId: "157817512673",
    appId: "1:157817512673:web:11f217478ee7a7d97bcda0"
  };
  
  
  
//   firebase.initializeApp(firebaseConfig);
  const app = initializeApp(firebaseConfig);


    // export const auth = firebase.auth();
    // export const googleProvider = new firebase.auth.GoogleAuthProvider();
    // export const db = firebase.firestore();

    export const auth = getAuth(app);
    export const googleProvider = new GoogleAuthProvider();
    export const db = getFirestore(app);