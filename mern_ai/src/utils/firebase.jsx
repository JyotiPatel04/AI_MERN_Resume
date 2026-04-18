
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_DgX5nWQAwcJo407lC4WCikdBRkJnlXk",
  authDomain: "mernai-1e690.firebaseapp.com",
  projectId: "mernai-1e690",
  storageBucket: "mernai-1e690.firebasestorage.app",
  messagingSenderId: "983362240899",
  appId: "1:983362240899:web:541e83b1817e4b440af6b6",
  measurementId: "G-3F63ETP6V3"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};