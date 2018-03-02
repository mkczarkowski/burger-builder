import React, { Component } from "react";
import axios from "../../../../config/axios/axios-orders";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import getInputConfiguration from "./getInputConfiguration";
import classes from "./ContactData.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: getInputConfiguration("input", {
        type: "text",
        placeholder: "Your name"
      }),
      street: getInputConfiguration("input", {
        type: "text",
        placeholder: "Your street"
      }),
      zipCode: getInputConfiguration("input", {
        type: "text",
        placeholder: "Your zip code"
      }),
      country: getInputConfiguration("input", {
        type: "text",
        placeholder: "Your country"
      }),
      email: getInputConfiguration("input", {
        type: "text",
        placeholder: "Your email"
      }),
      deliveryMethod: getInputConfiguration("select", {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" }
        ]
      })
    },
    isLoading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true }, sendOrder);

    function sendOrder() {
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price
      };
      axios
        .post("/orders.json", order)
        .then(response => {
          this.setState({ isLoading: false });
        })
        .catch(err => console.log(err));
    }
  };

  inputChangedHandler = (event, id) => {
    event.persist();
    this.setState(prevState => {
      return {
        orderForm: {
          ...prevState.orderForm,
          [id]: { ...prevState.orderForm[id], value: event.target.value }
        }
      };
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    console.log(formElementsArray);
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <form>
            {formElementsArray.map(
              ({ id, config: { inputType, attributes, value } }) => (
                <Input
                  inputType={inputType}
                  label={id}
                  name={id}
                  key={id}
                  attributes={attributes}
                  value={value}
                  handleChange={event => this.inputChangedHandler(event, id)}
                />
              )
            )}
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
