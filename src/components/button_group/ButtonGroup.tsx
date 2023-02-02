import React from "react";

import "./button_group.scss";

interface Props {
  actionsF: Function;
}

const ButtonsGroup: React.FC<Props> = ({ actionsF }): JSX.Element => {
  const actions = actionsF();

  const buttons = actions.map((action: any) => (
    <button key={action.name} onClick={action.action}>
      {action.name}
    </button>
  ));

  return <div className="controlsBtn">{buttons}</div>;
};

export default ButtonsGroup;
