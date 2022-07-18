import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

function addCartItem(cartItems, productToAdd) {
  // If product in cart -> increase quantity by 1
  // Else, add product with quantity=1

  // .find() returns the first item found
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

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => {},
  cartList: [],
  addItemToCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATES = {
  cartOpen: false,
  cartList: [],
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTIONS = {
  ADD_CART_ITEM: "ADD_CART_ITEM",
  TOGGLE_CART: "TOGGLE_CART",
};

function CartReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.ADD_CART_ITEM:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        cartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
}

export function CartProvider({ children }) {
  const [{ cartOpen, cartList, cartCount, cartTotal }, dispatch] = useReducer(
    CartReducer,
    INITIAL_STATES
  );

  const updateCartItems = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTIONS.ADD_CART_ITEM, {
        cartList: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const addItemToCart = (product) => {
    const newCartList = addCartItem(cartList, product);
    updateCartItems(newCartList);
  };

  const reduceItemInCart = (product) => {
    const newCartList = reduceCartItem(cartList, product);
    updateCartItems(newCartList);
  };

  const removeItemInCart = (product) => {
    const newCartList = removeCartItem(cartList, product);
    updateCartItems(newCartList);
  };

  const setCartOpen = (bool) => {
    dispatch(createAction(CART_ACTIONS.TOGGLE_CART, bool));
  };

  // useEffect(() => {
  //   const newCount = cartList.reduce((total, item) => total + item.quantity, 0);
  //   setCartCount(newCount);
  // }, [cartList]);

  // useEffect(() => {
  //   const newTotal = cartList.reduce(
  //     (total, item) => total + item.quantity * item.price,
  //     0
  //   );
  //   setCartTotal(newTotal);
  // }, [cartList]);

  const value = {
    cartCount,
    cartOpen,
    setCartOpen,
    cartList,
    cartTotal,
    addItemToCart,
    reduceItemInCart,
    removeItemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
