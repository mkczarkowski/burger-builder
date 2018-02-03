import React, { Component, Fragment } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    };
    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
  }

  updatePurchaseableState() {
    const ingredients = { ...this.state.ingredients };

    const sum = Object.keys(ingredients).reduce((acc, type) => {
      return acc + ingredients[type];
    }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler(type) {
    this.setState(prevState => {
      return {
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1
        },
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
      };
    }, this.updatePurchaseableState);
  }

  removeIngredientHandler(type) {
    this.setState(prevState => {
      if (prevState.ingredients[type] > 0) {
        return {
          ingredients: {
            ...prevState.ingredients,
            [type]: prevState.ingredients[type] - 1
          },
          totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
        };
      }
    }, this.updatePurchaseableState);
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    console.log("You continue!");
  }

  render() {
    const areDisabled = { ...this.state.ingredients };
    for (let ingredient in areDisabled) {
      areDisabled[ingredient] = areDisabled[ingredient] <= 0;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice.toFixed(2)}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={areDisabled}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
