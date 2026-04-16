
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// YOUR FIREBASE CONFIG
// Go to Firebase Console -> Project Settings -> General -> Your Apps -> Web App
const firebaseConfig = {
  apiKey: "AIzaSyAJvGSboRuxBlbmb_UBGofHUMZnCDgftbY",
  authDomain: "mln111-game.firebaseapp.com",
  projectId: "mln111-game",
  storageBucket: "mln111-game.firebasestorage.app",
  messagingSenderId: "168861548143",
  appId: "1:168861548143:web:dd8f390fa6dd85166fd79a",
  measurementId: "G-5WS6NGDCJK",
  databaseURL: "https://mln111-game-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
