import React, { Component } from "react";
import axios from "../../../../config/axios/axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    isLoading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true }, sendOrder);

    function sendOrder() {
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: "Marcin",
          address: {
            street: "Testowa 1",
            zipCode: "85-000",
            country: "Poland"
          },
          email: "test@test.com"
        },
        deliveryMethod: "fastest"
      };
      axios
        .post("/orders.json", order)
        .then(response => {
          console.log(response);
          this.setState({ isLoading: false });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <form>
            <input
              className={classes.Input}
              type="text"
              name="name"
              placeholder="Your name"
            />
            <input
              className={classes.Input}
              type="email"
              name="email"
              placeholder="Your email"
            />
            <input
              className={classes.Input}
              type="text"
              name="street"
              placeholder="Your street"
            />
            <input
              className={classes.Input}
              type="text"
              name="postal"
              placeholder="Your postal code"
            />
            <Button type="Success" handleClick={this.orderHandler}>
              Order
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default ContactData;
