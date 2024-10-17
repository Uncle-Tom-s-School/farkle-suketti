import React, { useState } from 'react';
import './App.css';

// Dice Component
const Dice: React.FC<{ value: number }> = ({ value }) => (
  <div className="dice">
    {value}
  </div>
);

const App: React.FC = () => {
  const [dice, setDice] = useState<number[]>([1, 1, 1, 1, 1, 1]);
  const [score, setScore] = useState<number>(0);
  const [turnScore, setTurnScore] = useState<number>(0);
  const [hasRolled, setHasRolled] = useState<boolean>(false);
  const [message, setMessage] = useState<string>(''); 
  // Rolls all the dice
  const rollDice = (): void => {
    const newDice = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6) + 1);
    setDice(newDice);
    setHasRolled(true);
    calculateScore(newDice); 
  };

 
  const calculateScore = (rolledDice: number[]): void => {
    const countMap: number[] = dice;

    
    rolledDice.forEach(die => {
      countMap[die - 1] += 1;
    });

    let highestScore = 0;

   
    const scoreSingle = (count: number): number => count * 100; 
    const scoreFive = (count: number): number => count * 50; 


    const currentScore = scoreSingle(countMap[0]) + scoreFive(countMap[4]);
    highestScore += currentScore; // Keep track of total score from 1's and 5's

    
    for (let i = 0; i < 6; i++) {
      if (countMap[i] >= 3) {

        if (i === 0) {
          const threeOfAKindScore = 1000 + (countMap[i] - 3) * 100; 
          highestScore += threeOfAKindScore; 
        } else {

          const baseScore = (i + 1) * 100;
          const threeOfAKindScore = baseScore * Math.pow(2, countMap[i] - 3); 
          highestScore += threeOfAKindScore; 
        }
      }
    }


    if (highestScore === 0) {
      setMessage('Farkle! You lose all your score.');
      setScore(0); 
    } else {
      setMessage(''); 
    }

    setTurnScore(highestScore); 
  };

  
  const bankScore = (): void => {
    if (turnScore > 0) {
      setScore(score + turnScore);
      setTurnScore(0);
      setHasRolled(false);
    } else {
      setMessage('You cannot bank a score of zero!'); 
    }
  };


  const resetGame = (): void => {
    setScore(0);
    setTurnScore(0);
    setDice([1, 1, 1, 1, 1, 1]);
    setHasRolled(false);
    setMessage(''); 
  };

  return (
    <div className="App">
      <h1>Farkle Game</h1>
      <div className="dice-container">
        {dice.map((die, index) => (
          <Dice key={index} value={die} />
        ))}
      </div>

      <div className="controls">
        <button onClick={rollDice} disabled={hasRolled}>
          Roll Dice
        </button>
        <button onClick={bankScore} disabled={turnScore === 0}>
          Bank Score
        </button>
        <button onClick={resetGame}>Reset Game</button>
      </div>

      <div className="score">
        <p>Current Turn Score: {turnScore}</p>
        <p>Total Score: {score}</p>
      </div>
      
      {message && <div className="message">{message}</div>} {}
    </div>
  );
};

export default App;
