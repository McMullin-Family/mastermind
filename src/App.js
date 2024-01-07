import React from 'react';
import Peg from "./components/Peg";
import {useGame} from "./hooks/useGame";
import Row from "./components/Row";

const debug = false;

function App() {
  const game = useGame();

  const selectableColors = ['red', 'blue', 'green', 'yellow'];
  
  return (
    <div className="app h-dvh flex flex-col justify-between">
      <header className="h-12 px-6 bg-slate-100 flex flex-row items-center">
        <div className="text-2xl font-bold">Mastermind</div>
        <div className="flex flex-grow justify-center">
          {game.gameOver && <h2>You win!</h2>}
        </div>
        <div className="mr-2 py-1 px-4 rounded-md bg-slate-900 text-white font-bold" onClick={game.startGame}>{game.secretCode.length ? 'Restart' : 'Start'}</div>
      </header>

      <main className="h-full flex flex-col justify-between">

        <div className="flex flex-row justify-center items-center w-full bg-slate-100">
          {game.secretCode.map((color, index) => (
            <Peg key={index} color={debug ? color : 'slategray'} />
          ))}
        </div>

        <div className="flex flex-col w-full">
          {game.pastGuesses.map((guess, index) => (
            <Row key={index} guess={guess} isPast={true} />
          ))}
        </div>

        <div className="flex flex-grow"></div>

        <div className="flex flex-row justify-center items-center w-full bg-slate-100">

          {game.currentGuess.map((color, index) => (
            <div onDragOver={(e) => {
              e.preventDefault();
            }} onDrop={e => {
              const color = e.dataTransfer.getData('color');
              const pegIndex = index;
              game.changeCurrent(pegIndex, color);
            }}>
              <Peg key={index} color={color} onClick={() => {
                const pegIndex = index;
                game.changeCurrent(pegIndex, null);
              }}/>
            </div>
          ))}

          <button className="py-1.5 px-2.5 rounded-full bg-slate-900 text-white font-bold" onClick={game.submitGuess}>Submit</button>
        </div>

        <div className="flex flex-row justify-center items-center w-full bg-slate-100">
          {selectableColors.map((color, index) => (
            <div className="cursor-grab outline-none" draggable onDragStart={(e) => {
              e.dataTransfer.setData('color', color);
            }}>
              <Peg key={index} color={color} />
            </div>
          ))}
        </div>

      </main>

      <footer className="h-12 bg-slate-100"></footer>

    </div>
  );
}

export default App;
