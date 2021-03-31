import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAd1RP1gI2OHpkYrryBTXnLJo973BnWpEg",
    authDomain: "svelte-crud-12a8e.firebaseapp.com",
    projectId: "svelte-crud-12a8e",
    storageBucket: "svelte-crud-12a8e.appspot.com",
    messagingSenderId: "582024693779",
    appId: "1:582024693779:web:c08653115e6ddbafdc97e6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();