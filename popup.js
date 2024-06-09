// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

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
