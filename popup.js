// Import the functions you need from the SDKs you need
import { initializeApp } from '../node_modules/firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB7PxfBESDpHdN2uJQ9t98HxcL_obCZglY',
  authDomain: 'rps-extension.firebaseapp.com',
  databaseURL: 'https://rps-extension-default-rtdb.firebaseio.com',
  projectId: 'rps-extension',
  storageBucket: 'rps-extension.appspot.com',
  messagingSenderId: '395466577932',
  appId: '1:395466577932:web:f57a2acee5de4d8a8cb629'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('rock').addEventListener('click', () => playGame('rock'));
  document.getElementById('paper').addEventListener('click', () => playGame('paper'));
  document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
});
