import React, { Fragment } from "react";

import Button from "../../UI/Button/Button";

const orderSummary = ({
  ingredients,
  purchaseContinued,
  purchaseCancelled
}) => {
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
      <Button type="Danger" handleClick={purchaseCancelled}>
        CANCEL
      </Button>
      <Button type="Success" handleClick={purchaseContinued}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default orderSummary;
