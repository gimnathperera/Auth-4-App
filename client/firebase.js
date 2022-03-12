// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBL1yKvtj5sG7WhCAZyT1w8lkeyEeUzE-Y",
  authDomain: "fypdemo-389f2.firebaseapp.com",
  projectId: "fypdemo-389f2",
  storageBucket: "fypdemo-389f2.appspot.com",
  messagingSenderId: "766449774066",
  appId: "1:766449774066:web:8241b1c5a2d6b7d6eccf6b"
  
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
const auth = firebase.auth()

export { auth };