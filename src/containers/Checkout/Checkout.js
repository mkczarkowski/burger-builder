import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
      },
      totalPrice: 0
    };
  }

  componentDidMount = () => {
    const searchParams = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    for (let param of searchParams.entries()) {
      if (param[0] === "price") {
        this.setState({ totalPrice: Number(param[1]).toFixed(2) });
      } else {
        ingredients[param[0]] = Number(param[1]);
      }
    }
    this.setState({ ingredients });
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelledHandler={this.checkoutCancelledHandler}
          checkoutContinuedHandler={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
