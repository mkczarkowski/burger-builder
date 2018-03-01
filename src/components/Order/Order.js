import React from "react";

import classes from "./Order.css";

const Order = ({ ingredients, price }) => {
  const ingredientsList = Object.keys(ingredients).map(ingredient => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          padding: "5px",
          margin: "5px",
          border: "solid 1px #ccc"
        }}
      key={ingredient}>
        {ingredient} ({ingredients[ingredient]})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsList}</p>
      <p>
        Price: <strong>USD {price}</strong>
      </p>
    </div>
  );
};

Order.defaultProps = {
  ingredients: []
};

export default Order;
