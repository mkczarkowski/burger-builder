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
      name: getInputConfiguration(
        "input",
        {
          type: "text",
          placeholder: "Your name"
        },
        { required: true }
      ),
      street: getInputConfiguration(
        "input",
        {
          type: "text",
          placeholder: "Your street"
        },
        { required: true }
      ),
      zipCode: getInputConfiguration(
        "input",
        {
          type: "text",
          placeholder: "Your zip code"
        },
        { required: true, minLength: 6, maxLength: 6 }
      ),
      country: getInputConfiguration(
        "input",
        {
          type: "text",
          placeholder: "Your country"
        },
        { required: true }
      ),
      email: getInputConfiguration(
        "input",
        {
          type: "text",
          placeholder: "Your email"
        },
        { required: true }
      ),
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
      const formData = {};
      for (let formElementId in this.state.orderForm) {
        formData[formElementId] = this.state.orderForm[formElementId].value;
      }
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        formData
      };
      axios
        .post("/orders.json", order)
        .then(response => {
          this.setState({ isLoading: false });
        })
        .catch(err => console.log(err));
    }
  };

  checkValidity(value, rules) {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, id) => {
    event.persist();
    const inputValue = event.target.value;
    this.setState(prevState => {
      return {
        orderForm: {
          ...prevState.orderForm,
          [id]: {
            ...prevState.orderForm[id],
            value: inputValue,
            isValid: this.checkValidity(
              inputValue,
              prevState.orderForm[id].validation
            ),
            touched: true
          }
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

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <form>
            {formElementsArray.map(
              ({
                id,
                config: {
                  inputType,
                  attributes,
                  validation,
                  value,
                  isValid,
                  touched
                }
              }) => (
                <Input
                  inputType={inputType}
                  label={id}
                  name={id}
                  key={id}
                  attributes={attributes}
                  value={value}
                  valid={isValid}
                  shouldValidate={Object.keys(validation).length > 0}
                  touched={touched}
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
