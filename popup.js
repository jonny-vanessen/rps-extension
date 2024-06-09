import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: 'https://rps-extension-default-rtdb.firebaseio.com/'
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
