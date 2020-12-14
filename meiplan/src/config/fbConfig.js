import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBoyLqaXxp05IFzH9_5Fg3Md8xypNh-q4c",
  authDomain: "firestore-tut-ce62c.firebaseapp.com",
  databaseURL: "https://firestore-tut-ce62c.firebaseio.com",
  projectId: "firestore-tut-ce62c",
  storageBucket: "firestore-tut-ce62c.appspot.com",
  messagingSenderId: "360050501440",
  appId: "1:360050501440:web:c86fb50a1dc779b8a9bca5",
  measurementId: "G-8HEJ5PH78B",
};

firebase.initializeApp(config);
export default firebase;
