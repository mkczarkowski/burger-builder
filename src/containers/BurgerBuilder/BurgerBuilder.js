import React, { Component, Fragment } from "react";
import axios from "../../../config/axios/axios-orders";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

import Burger from "../../components/Burger/Burger";
import BuildControlList from "../../components/Burger/BuildControlList/BuildControlList";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/errorHandler/errorHandler";

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPurchasing: false,
      isLoading: false,
      hasErrorOccurred: false
    };

    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinueHandler = this.purchaseContinueHandler.bind(this);
  }

  componentDidMount = () => {
    // axios
    //   .get("/ingredients.json")
    //   .then(({ data: ingredients }) => {
    //     this.setState({ ingredients });
    //   })
    //   .catch(() => this.setState({ hasErrorOccurred: true }));
  };

  updatePurchaseableState() {
    const ingredients = { ...this.props.ingredients };

    const sum = Object.keys(ingredients).reduce((acc, type) => {
      return acc + ingredients[type];
    }, 0);

    return sum > 0;
  }

  purchaseHandler() {
    this.setState({ isPurchasing: true });
  }

  purchaseCancelHandler() {
    this.setState({ isPurchasing: false });
  }

  purchaseContinueHandler() {
    this.props.history.push({
      pathname: "/checkout"
    });

    this.props.history.goForward();
  }

  render() {
    const areDisabled = { ...this.props.ingredients };
    for (let ingredient in areDisabled) {
      areDisabled[ingredient] = areDisabled[ingredient] <= 0;
    }
    let builderContent = this.state.hasErrorOccurred ? (
      <p style={{ textAlign: "center" }}>Ingredients can't be loaded</p>
    ) : this.props.ingredients ? (
      <Fragment>
        <Burger ingredients={this.props.ingredients} />
        <BuildControlList
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          disabled={areDisabled}
          purchasable={this.updatePurchaseableState(this.props.ingredients)}
          price={this.props.totalPrice}
          ordered={this.purchaseHandler}
        />
      </Fragment>
    ) : (
      <Spinner />
    );
    let modalContent =
      this.state.isLoading || !this.props.ingredients ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice.toFixed(2)}
        />
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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingType =>
      dispatch({ type: actionTypes.INGREDIENT_ADD, ingType }),
    onIngredientRemoved: ingType =>
      dispatch({ type: actionTypes.INGREDIENT_REMOVE, ingType })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  errorHandler(BurgerBuilder, axios)
);
