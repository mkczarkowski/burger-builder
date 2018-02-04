import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControlList = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => {
      return (
        <BuildControl
          ingredientAdded={() => props.ingredientAdded(ctrl.type)}
          ingredientRemoved={() => props.ingredientRemoved(ctrl.type)}
          key={ctrl.label}
          disabled={props.disabled[ctrl.type]}
          {...ctrl}
        />
      );
    })}
    <button
      disabled={!props.purchasable}
      className={classes.OrderButton}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);

export default buildControlList;
