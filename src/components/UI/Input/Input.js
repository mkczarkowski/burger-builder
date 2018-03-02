import React from "react";

import classes from "./Input.css";

const Input = ({ inputType, label, value, attributes, handleChange }) => {
  let inputElement = null;

  switch (inputType) {
    case "input": {
      inputElement = (
        <input
          className={classes.InputElement}
          {...attributes}
          value={value}
          onChange={handleChange}
        />
      );
      break;
    }
    case "select": {
      inputElement = (
        <select className={classes.InputElement} onChange={handleChange}>
          {attributes.options.map(({ value, displayValue }) => (
            <option key={value} value={value}>
              {displayValue}
            </option>
          ))}
        </select>
      );
      break;
    }
    default: {
      inputElement = (
        <input
          className={classes.InputElement}
          {...attributes}
          value={value}
          onChange={handleChange}
        />
      );
    }
  }

  return (
    <div className={classes.Input}>
      <label htmlFor={label} className={classes.Label}>
        {label.replace(/([A-Z])/g, " $1")}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
