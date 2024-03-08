import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwWkVyWCVuFjJVOPWQwFtKIAeDEMD_yt0",
  authDomain: "my-numbers-game-525b7.firebaseapp.com",
  projectId: "my-numbers-game-525b7",
  storageBucket: "my-numbers-game-525b7.appspot.com",
  messagingSenderId: "46795804306",
  appId: "1:46795804306:web:eca6d2172505c37d09e04b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
