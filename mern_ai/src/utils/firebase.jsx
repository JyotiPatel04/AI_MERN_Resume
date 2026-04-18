
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMiZsCgrUlkbF7BzFRPjLW7WR0Jd38IhU",
  authDomain: "mernai-fb6a2.firebaseapp.com",
  projectId: "mernai-fb6a2",
  storageBucket: "mernai-fb6a2.firebasestorage.app",
  messagingSenderId: "455394868446",
  appId: "1:455394868446:web:2529d71145bc9de028964f",
  measurementId: "G-DMHSQPCJ0S"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
