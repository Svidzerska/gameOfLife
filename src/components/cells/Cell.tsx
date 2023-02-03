import React from "react";

import "./cell.scss";

interface Props {
  className: string;
  id: number;
  flex_basis: number;
  onSelect: Function;
  color: string;
}

const Cell: React.FC<Props> = ({ className, id, flex_basis, onSelect, color }): JSX.Element => {
  console.log(className);
  return (
    <div className={`${className} ${color}`} onClick={() => onSelect(id)} style={{ flexBasis: `${flex_basis}%` }}></div>
  );
};

export default Cell;
