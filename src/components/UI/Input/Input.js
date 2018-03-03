import React from "react";

import classes from "./Input.css";

const Input = ({
  inputType,
  label,
  value,
  attributes,
  valid,
  shouldValidate,
  touched,
  handleChange
}) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (valid === false && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (inputType) {
    case "input": {
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...attributes}
          value={value}
          onChange={handleChange}
        />
      );
      break;
    }
    case "select": {
      inputElement = (
        <select className={inputClasses.join(" ")} onChange={handleChange}>
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
          className={inputClasses.join(" ")}
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
