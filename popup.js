// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
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
  const resultDiv = document.getElementById('result');

  const playGame = (choice) => {
    const gameRef = database.ref('game');
    gameRef.once('value').then((snapshot) => {
      const data = snapshot.val();
      const opponentChoice = data ? data.choice : null;

      if (opponentChoice) {
        gameRef.set(null); // Clear the game
        const result = getResult(choice, opponentChoice);
        resultDiv.innerText = `You: ${choice}, Opponent: ${opponentChoice}. Result: ${result}`;
      } else {
        gameRef.set({ choice });
        resultDiv.innerText = 'Waiting for opponent...';
      }
    });
  };

  const getResult = (choice1, choice2) => {
    if (choice1 === choice2) return 'Draw';
    if (
      (choice1 === 'rock' && choice2 === 'scissors') ||
      (choice1 === 'paper' && choice2 === 'rock') ||
      (choice1 === 'scissors' && choice2 === 'paper')
    ) {
      return 'You win!';
    }
    return 'You lose!';
  };

  document.getElementById('rock').addEventListener('click', () => playGame('rock'));
  document.getElementById('paper').addEventListener('click', () => playGame('paper'));
  document.getElementById('scissors').addEventListener('click', () => playGame('scissors'));
});
