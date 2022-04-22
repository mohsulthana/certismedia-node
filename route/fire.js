import { initializeApp } from "firebase/app";
import ServiceAccount from "firebase-admin";
import account from '../serviceAccountKey.json'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiN4y8Weaj9y9mJsdy9wdP2gaVUjLv9_o",
  authDomain: "certismedia.firebaseapp.com",
  databaseURL: "https://certismedia-default-rtdb.firebaseio.com",
  projectId: "certismedia",
  storageBucket: 'gs://certismedia.appspot.com',
  messagingSenderId: "979371041253",
  appId: "1:979371041253:web:8b24ee3b37b6ce1bbf4f0c",
  measurementId: "G-L6L1KMYB8P",
  credential: ServiceAccount.credential.cert(account),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export default app