import React, { Component, Fragment } from "react";

import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {}

  render() {
    const order = Object.keys(this.props.ingredients).map(type => {
      return (
        <li key={type}>
          <span style={{ textTransform: "capitalize" }}>{type}</span>:{" "}
          {this.props.ingredients[type]}
        </li>
      );
    });

    return (
      <Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{order}</ul>
        <p>
          <strong>Total price: {this.props.price}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button type="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button type="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
