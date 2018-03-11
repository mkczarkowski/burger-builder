import React from "react";

import classes from "./Button.css";

const button = ({ type, children, handleClick, isEnabled = true }) => {
  const btnClasses = [classes.Button, classes[type]];

  return (
    <button className={btnClasses.join(" ")} onClick={handleClick} disabled={!isEnabled}>
      {children}
    </button>
  );
};

export default button;
