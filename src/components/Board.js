import React from 'react';
import Row from './Row'; // Importing the Row component

const Board = ({ guesses, currentGuess, onPegClick }) => {
  return (
    <div className="board">
      {
        // Mapping through each guess and rendering a Row component
        guesses.map((guess, index) => (
          <Row 
            key={index}
            guess={guess}
            current={index === currentGuess}
            onPegClick={(pegIndex) => onPegClick(index, pegIndex)}
          />
        ))
      }
    </div>
  );
};

export default Board;
