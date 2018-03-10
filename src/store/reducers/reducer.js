import * as actionTypes from "../actions";

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0
  },
  price: 4
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
        }
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
          }
        };
      }
    }
    case actionTypes.PRICE_SET: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
