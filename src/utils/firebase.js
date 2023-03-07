// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, setPersistence } from 'firebase/auth'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBkArt8J9gTwtYB4SpWGthRWeFSqAN97XQ',
  authDomain: 'killer-ideas-46515.firebaseapp.com',
  projectId: 'killer-ideas-46515',
  storageBucket: 'killer-ideas-46515.appspot.com',
  messagingSenderId: '800580007540',
  appId: '1:800580007540:web:ce78f1be3170ee02588321',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get an instance of the authentication service
const auth = getAuth(app)

// Get an instance of the Firestore service
const db = getFirestore(app)

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword }
