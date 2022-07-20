import { createAction } from '../../utils/reducer/reducer.utils';

import CART_ACTION_TYPES from './cart.types';


function addCartItem(cartItems, productToAdd) {
  const cartItemExist = cartItems.find((item) => item.id === productToAdd.id);

  if (cartItemExist) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function reduceCartItem(cartItems, productToReduce) {
  const cartItemExist = cartItems.find(
    (item) => item.id === productToReduce.id
  );

  if (cartItemExist.quantity === 1) {
    return cartItems.filter(({ id }) => id !== cartItemExist.id);
  }

  return cartItems.map((item) =>
    item.id === productToReduce.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
}

function removeCartItem(cartItems, productToRemove) {
  return cartItems.filter(({ id }) => id !== productToRemove.id);
}

export function addItemToCart(cartList, product) {
  const newCartList = addCartItem(cartList, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartList);
};

export const reduceItemInCart = (cartList, product) => {
  const newCartList = reduceCartItem(cartList, product);
  return createAction( CART_ACTION_TYPES.SET_CART_ITEMS ,newCartList);
};

export const removeItemInCart = (cartList, product) => {
  const newCartList = removeCartItem(cartList, product);
  return createAction( CART_ACTION_TYPES.SET_CART_ITEMS ,newCartList);
};

export const setCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART, bool);
};
