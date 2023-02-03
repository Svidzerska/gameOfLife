import React, { useEffect, useState } from "react";
import "./App.scss";
import ButtonsGroup from "./components/button_group/ButtonGroup";
import Board from "./components/board/Board";

const App: React.FC = (): JSX.Element => {
  const [filling, setFilling] = useState<{ cells: boolean[]; generation: number }>({
    cells: [],
    generation: 0,
  });

  const [intervalIdState, setIntervalIdState] = useState<NodeJS.Timer>();

  const [setupWindow, setSetupWindow] = useState<boolean>(false);

  const [rows, setRows] = useState<string>("10");
  const [cols, setCols] = useState<string>("10");
  const [speed, setSpeed] = useState<string>("500");

  const [setting, setSetting] = useState<{ rows: number; cols: number; speed: number }>({
    rows: 10,
    cols: 10,
    speed: 500,
  });

  useEffect(() => {
    seed();
  }, [, setting]);

  const seed = (): void => {
    const size = setting.rows * setting.cols;
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

    setFilling((f) => {
      const size = setting.rows * setting.cols;
      const newCells = f.cells.slice(); // copy of array

      const cells = f.cells;
      const cols = setting.cols;

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
    console.log(setting.speed);
    clearInterval(intervalIdState);
    const intervalId = setInterval(() => run(), setting.speed);
    setIntervalIdState(intervalId);
  };

  const pause = (): void => {
    clearInterval(intervalIdState);
  };

  const clear = (): void => {
    const size = setting.rows * setting.cols;
    const cells = Array(size).fill(false);
    setFilling({ cells: cells, generation: 0 });
    clearInterval(intervalIdState);
  };

  const setup = (): void => {
    setSetupWindow(true);
    clearInterval(intervalIdState);
  };

  const getSetting = (): void => {
    const currentRows = +rows;
    const currentCols = +cols;
    const currentSpeed = +speed;

    setSetting(() => {
      return {
        rows: !isNaN(currentRows) ? currentRows : 10,
        cols: !isNaN(currentCols) ? currentCols : 10,
        speed: !isNaN(currentSpeed) ? currentSpeed : 10,
      };
    });
  };

  const getActions = (): any => {
    return [
      { name: "Play", action: () => play() },
      {
        name: "One Step",
        action: () => {
          clearInterval(intervalIdState);
          run();
        },
      },
      { name: "Pause", action: () => pause() },
      { name: "Clear", action: () => clear() },
      { name: "Seed", action: () => seed() },
      { name: "Setup", action: () => setup() },
    ];
  };

  return (
    <div className="App">
      <h1>Game of Life</h1>
      <ButtonsGroup actionsF={getActions} />
      <Board
        cells={filling.cells}
        flex_basis={100 / setting.cols}
        width={setting.cols * 10}
        onSelect={selectCell}
        generation={filling.generation}
        color={
          (filling.generation + 1) % 4 === 0
            ? "blue"
            : (filling.generation + 1) % 2 === 0
            ? "green"
            : (filling.generation + 2) % 4 === 0
            ? "violet"
            : "yellow"
        }
      />
      {setupWindow && (
        <div className="setupGroup">
          <input type="text" value={rows} onChange={(e) => setRows(e.target.value)} />
          <input type="text" value={cols} onChange={(e) => setCols(e.target.value)} />
          <input type="text" value={speed} onChange={(e) => setSpeed(e.target.value)} />
          <button
            type="submit"
            onClick={() => {
              setSetupWindow(false);
              getSetting();
            }}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
