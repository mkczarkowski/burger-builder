import * as actionTypes from "../actions";

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INGREDIENT_ADD: {
      const { ingType } = action;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [ingType]: state.ingredients[ingType] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[ingType]
      };
    }
    case actionTypes.INGREDIENT_REMOVE: {
      const { ingType } = action;
      if (state.ingredients[ingType] > 0) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [ingType]: state.ingredients[ingType] - 1
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[ingType]
        };
      }
      break;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
