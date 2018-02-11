import React, { Component, Fragment } from "react";
import axios from "../../../config/axios/axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControlList/BuildControlList";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/errorHandler/errorHandler";

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
      ingredients: null,
      totalPrice: 4,
      purchasable: false,
      isPurchasing: false,
      isLoading: false,
      hasErrorOccurred: false
    };
    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
  }

  componentDidMount = () => {
    axios
      .get("/ingredients")
      .then(({ data: ingredients }) => {
        this.setState({ ingredients });
      })
      .catch(() => this.setState({ hasErrorOccurred: true }));
  };

  updatePurchaseableState() {
    const ingredients = { ...this.state.ingredients };

    const sum = Object.keys(ingredients).reduce((acc, type) => {
      return acc + ingredients[type];
    }, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler(type) {
    this.setState(({ ingredients, totalPrice }) => {
      return {
        ingredients: {
          ...ingredients,
          [type]: ingredients[type] + 1
        },
        totalPrice: totalPrice + INGREDIENT_PRICES[type]
      };
    }, this.updatePurchaseableState);
  }

  removeIngredientHandler(type) {
    this.setState(({ ingredients, totalPrice }) => {
      if (ingredients[type] > 0) {
        return {
          ingredients: {
            ...ingredients,
            [type]: ingredients[type] - 1
          },
          totalPrice: totalPrice - INGREDIENT_PRICES[type]
        };
      }
    }, this.updatePurchaseableState);
  }

  purchaseHandler() {
    this.setState({ isPurchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ isPurchasing: false });
  }

  purchaseContinueHandler() {
    this.setState({ isLoading: true }, sendOrder);

    function sendOrder() {
      const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
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
          this.setState({ isLoading: false, isPurchasing: false });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    const areDisabled = { ...this.state.ingredients };
    for (let ingredient in areDisabled) {
      areDisabled[ingredient] = areDisabled[ingredient] <= 0;
    }
    let modalContent =
      this.state.isLoading || !this.state.ingredients ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice.toFixed(2)}
        />
      );
    let builderContent = this.state.hasErrorOccurred ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p>
    ) : this.state.ingredients ? (
      <Fragment>
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
    ) : (
      <Spinner />
    );
    return (
      <Fragment>
        <Modal
          show={this.state.isPurchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {modalContent}
        </Modal>
        {builderContent}
      </Fragment>
    );
  }
}

export default errorHandler(BurgerBuilder, axios);
