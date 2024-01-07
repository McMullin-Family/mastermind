import React from 'react';
import Peg from './Peg';

const Row = ({ guess, className, isPast, onPegClick }) => {
  return (
    <div className={"flex flex-row justify-center items-center w-full relative " + className}>
      {guess.colors.map((peg_color, index) => (
        <Peg
          key={index}
          color={peg_color}
          onClick={() => onPegClick?.(index)}
        />
      ))}
      {isPast && (
        <div className="absolute right-2">
          {Array(guess.correctPositions).fill()
            .map((_, index) => (
              <div className="w-3 h-3 rounded-full bg-red-900"></div>
            ))}
          {Array(guess.correctColors).fill()
            .map((_, index) => (
              <div className="w-3 h-3 rounded-full bg-red-300"></div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Row;
