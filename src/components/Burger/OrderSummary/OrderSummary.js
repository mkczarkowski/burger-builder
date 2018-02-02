import React, { Fragment } from "react";

const orderSummary = ({ ingredients }) => {
  const order = Object.keys(ingredients).map(type => {
    return (
      <li key={type}>
        <span style={{ textTransform: "capitalize" }}>{type}</span>:{" "}
        {ingredients[type]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{order}</ul>
      <p>Continue to Checkout?</p>
    </Fragment>
  );
};

export default orderSummary;
