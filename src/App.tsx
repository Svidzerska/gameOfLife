import React, { useEffect, useState } from "react";
import "./App.css";
import ButtonsGroup from "./components/button_group/ButtonGroup";
import Board from "./components/board/Board";

const App: React.FC = (): JSX.Element => {
  const field = {
    rows: 20,
    cols: 20,
  };

  const fillingStart = {
    cells: [],
    generation: 0,
  };

  const [filling, setFilling] = useState<{ cells: boolean[]; generation: number }>(fillingStart);

  useEffect(() => {
    seed();
    play();
  }, []);

  const seed = (): void => {
    console.log(111);
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

  const play = (): void => {
    console.log(222);
  };

  const run = (): void => {
    const size = field.rows * field.cols;
    const newCells = filling.cells.slice(); // copy of array

    for (let i = 0; i < size; i++) {
      let counter = 0;

      const cells = fillingStart.cells;
      const cols = field.cols;

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

      if (fillingStart.cells[i] && (counter < 2 || counter > 3)) {
        newCells[i] = false;
      }
      if (!fillingStart.cells[i] && counter === 3) {
        newCells[i] = true;
      }

      setFilling({
        cells: newCells,
        generation: filling.generation + 1,
      });
    }
  };

  return (
    <div className="App">
      <h1>Game of Life</h1>
      {/* <ButtonsGroup actions={actions} width={width} /> */}
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
