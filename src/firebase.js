import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAWqCQJWvE0GdfDVQ15G5NKhRlj9fVN-F8",
    authDomain: "yaty-ujas.firebaseapp.com",
    projectId: "yaty-ujas",
    storageBucket: "yaty-ujas.appspot.com",
    messagingSenderId: "941034482845",
    appId: "1:941034482845:web:79770659950dca795df874",
    measurementId: "G-24S1YQS78S"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};