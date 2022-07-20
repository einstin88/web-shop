import CART_ACTION_TYPES from "./cart.types";

const CART_INITIAL_STATE = {
  cartOpen: false,
  cartList: [],
};

export function cartReducer(state = CART_INITIAL_STATE, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartList: payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART:
      return {
        ...state,
        cartOpen: payload,
      };
    default:
      return state;
  }
}
