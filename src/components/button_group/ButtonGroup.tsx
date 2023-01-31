import React from "react";

import "./button_group.scss";

interface Props {
  actions: any;
  width: any;
}

const ButtonsGroup: React.FC<Props> = ({ actions, width }): JSX.Element => {
  const buttons = actions.map((action: any) => (
    <button key={action.name} onClick={action.action}>
      {action.name}
    </button>
  ));

  return (
    <div className="controlsBtn" style={{ width: width }}>
      {buttons}
    </div>
  );
};

export default ButtonsGroup;
