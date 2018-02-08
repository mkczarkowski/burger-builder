import React, { Fragment } from "react";

import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const order = Object.keys(props.ingredients).map(type => {
    return (
      <li key={type}>
        <span style={{ textTransform: "capitalize" }}>{type}</span>:{" "}
        {props.ingredients[type]}
      </li>
    );
  });
  return (
    <Fragment>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{order}</ul>
      <p>Continue to Checkout?</p>
      <Button type="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Fragment>
  );
};

export default orderSummary;
