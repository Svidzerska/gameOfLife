import React, { useEffect, useState } from "react";
import "./App.scss";
import ButtonsGroup from "./components/button_group/ButtonGroup";
import Board from "./components/board/Board";

const App: React.FC = (): JSX.Element => {
  const speed = 500;

  const field = {
    rows: 10,
    cols: 10,
  };

  const [filling, setFilling] = useState<{ cells: boolean[]; generation: number }>({
    cells: [],
    generation: 0,
  });

  const [intervalIdState, setIntervalIdState] = useState<NodeJS.Timer>();

  useEffect(() => {
    seed();
  }, []);

  useEffect(() => {
    console.log(filling);
  }, [filling]);

  const seed = (): void => {
    const size = field.rows * field.cols;
    const cells = Array(size)
      .fill(false)
      .map((cell) => (cell = Math.floor(Math.random() * 4) === 1 ? true : false));

    setFilling({ cells: cells, generation: 0 });
  };

  const selectCell = (id: number) => {
    let cells = filling.cells.slice();
    cells[id] = !cells[id];
    setFilling({ cells: cells, generation: 0 });
  };

  const run = (): void => {
    console.log(33333);

    // The problem is that inside the setInterval callback,
    //  the value of count does not change,
    //  because we’ve created a closure with the value of
    //  count set to 0 as it was when the effect callback ran.
    //  Every second, this callback then calls setCount(0 + 1),
    //  so the count never goes above 1.

    setFilling((f) => {
      const size = field.rows * field.cols;
      const newCells = f.cells.slice(); // copy of array

      const cells = f.cells;
      const cols = field.cols;

      for (let i = 0; i < size; i++) {
        let counter = 0;

        if (i % cols === 0) {
          if (cells[i + 1]) counter++;
          if (cells[i - cols]) counter++;
          if (cells[i + cols]) counter++;
          if (cells[i - cols + 1]) counter++;
          if (cells[i + cols + 1]) counter++;
        } else if ((i + 1) % cols === 0) {
          if (cells[i - 1]) counter++;
          if (cells[i - cols]) counter++;
          if (cells[i + cols]) counter++;
          if (cells[i - cols - 1]) counter++;
          if (cells[i + cols - 1]) counter++;
        } else {
          if (cells[i - 1]) counter++;
          if (cells[i + 1]) counter++;
          if (cells[i - cols]) counter++;
          if (cells[i + cols]) counter++;
          if (cells[i - cols - 1]) counter++;
          if (cells[i - cols + 1]) counter++;
          if (cells[i + cols - 1]) counter++;
          if (cells[i + cols + 1]) counter++;
        }

        if (f.cells[i] && (counter < 2 || counter > 3)) {
          newCells[i] = false;
        }
        if (!f.cells[i] && counter === 3) {
          newCells[i] = true;
        }
      }
      return {
        cells: newCells,
        generation: f.generation + 1,
      };
    });
  };

  const play = (): void => {
    console.log(speed);
    clearInterval(intervalIdState);
    const intervalId = setInterval(() => run(), speed);
    console.log(intervalId);
    setIntervalIdState(intervalId);
  };

  const pause = (): void => {
    clearInterval(intervalIdState);
  };

  const clear = (): void => {
    const size = field.rows * field.cols;
    const cells = Array(size).fill(false);
    setFilling({ cells: cells, generation: 0 });
    clearInterval(intervalIdState);
  };

  const getActions = (): any => {
    return [
      { name: "Play", action: () => play() },
      { name: "Pause", action: () => pause() },
      { name: "Clear", action: () => clear() },
      { name: "Seed", action: () => seed() },
    ];
  };

  return (
    <div className="App">
      <h1>Game of Life</h1>
      <ButtonsGroup actionsF={getActions} />
      <Board
        cells={filling.cells}
        flex_basis={100 / field.cols}
        width={field.cols * 10}
        onSelect={selectCell}
        generation={filling.generation}
      />
    </div>
  );
};

export default App;
