import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBz26ZR9jrK5deqndmZkjChswKN6toUQtw",
    authDomain: "messanger-app-8bf17.firebaseapp.com",
    projectId: "messanger-app-8bf17",
    storageBucket: "messanger-app-8bf17.appspot.com",
    messagingSenderId: "119456431220",
    appId: "1:119456431220:web:ad4ae2275f132257c82521"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }