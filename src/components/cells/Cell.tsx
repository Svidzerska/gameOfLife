import React from "react";

import "./cell.scss";

interface Props {
  className: string;
  id: number;
  flex_basis: number;
  onSelect: Function;
}

const Cell: React.FC<Props> = ({ className, id, flex_basis, onSelect }): JSX.Element => {
  return <div className={className} onClick={() => onSelect(id)} style={{ flexBasis: `${flex_basis}%` }}></div>;
};

export default Cell;
