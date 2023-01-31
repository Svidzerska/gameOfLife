import React from "react";
import Cell from "../cells/Cell";

import "./board.scss";

interface Props {
  cells: boolean[];
  width: number;
  flex_basis: number;
  generation: number;
  onSelect: Function;
}

const Board: React.FC<Props> = ({ cells, width, flex_basis, generation, onSelect }): JSX.Element => {
  const arr = cells.map((cell: boolean, index: number) => {
    return (
      <Cell
        key={cell.toString() + index}
        id={index}
        className={cell ? "cell alive" : "cell dead"}
        onSelect={onSelect}
        flex_basis={flex_basis}
      ></Cell>
    );
  });

  return (
    <>
      <h4>Generation: {generation}</h4>
      <div className="board" style={{ width: width }}>
        {arr}
      </div>
    </>
  );
};

export default Board;
