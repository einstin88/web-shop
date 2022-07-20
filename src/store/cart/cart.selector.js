import { createSelector } from "reselect";

function selectCartReducer(state) {
  return state.cart;
}
export const selectCartOpen = createSelector([], (cartSlice) => cartSlice.cartOpen);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartList
);


export const selectCartCount = createSelector([selectCartItems], (newCartList) =>
  newCartList.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (newCartList) =>
  newCartList.reduce((total, item) => total + item.quantity * item.price, 0)
);
