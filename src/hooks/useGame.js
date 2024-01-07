import { useState, useCallback, useMemo } from 'react';

/**
 * A custom hook to manage the game state
 * 
 * @returns {object} game - An object containing the game state and functions to manipulate it
 * @returns {string[]} game.secretCode - The secret code
 * @returns {string[]} game.currentGuess - The current guess
 * @returns {boolean} game.gameOver - Whether the game is over
 * @returns {function} game.startGame - A function to start the game
 * @returns {function} game.changeCurrent - A function to make a move
 * @returns {function} game.restartGame - A function to restart the game
 */
export const useGame = () => {
  
  const initialSecretCode = useMemo(() => [], []);
  const initialCurrentGuess = useMemo(() => [null, null, null, null], []);
  const initialPastGuesses = useMemo(() => [], []);
  const initialGameOver = false;

  const [secretCode, setSecretCode] = useState(initialSecretCode);
  const [currentGuess, setCurrentGuess] = useState(initialCurrentGuess);
  const [pastGuesses, setPastGuesses] = useState(initialPastGuesses);
  const [gameOver, setGameOver] = useState(initialGameOver);

  const startGame = useCallback(() => {
    // Generate a random secret code
    const colors = ['red', 'blue', 'green', 'yellow'];
    const code = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      code.push(colors[randomIndex]);
    }
    setSecretCode(code);
    setCurrentGuess([...initialCurrentGuess]);
    setPastGuesses([...initialPastGuesses]);
    setGameOver(!!initialGameOver);
  }, [initialCurrentGuess, initialPastGuesses, initialGameOver]);

  const changeCurrent = useCallback((index, color) => {
    console.log('changeCurrent', {index, color});
    setCurrentGuess((prevGuess) => {
      const newGuess = [...prevGuess];
      newGuess[index] = color;
      return newGuess;
    });
  }, []);

  const submitGuess = useCallback(() => {
    // Check if the current guess matches the secret code
    if (currentGuess.filter(v => !!v).length === 4) {
      let correctPositions = 0;
      let correctColors = 0;

      for (let i = 0; i < 4; i++) {
        if (currentGuess[i] === secretCode[i]) {
          correctPositions++;
        } else if (secretCode.includes(currentGuess[i])) {
          correctColors++;
        }
      }

      setGameOver(correctPositions === 4);
      setPastGuesses((prevGuesses) => [...prevGuesses, {colors: currentGuess, correctPositions, correctColors}]);
      setCurrentGuess([...initialCurrentGuess]);
    }
  }, [currentGuess, secretCode, initialCurrentGuess]);

  return {
    secretCode,
    currentGuess,
    pastGuesses,
    gameOver,
    startGame,
    changeCurrent,
    submitGuess
  };
};
  