import { createContext, useEffect, useState } from "react";

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

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = (product) =>
    setCartList(addCartItem(cartList, product));

  const reduceItemInCart = (product) =>
    setCartList(reduceCartItem(cartList, product));

  const removeItemInCart = (product) =>
    setCartList(removeCartItem(cartList, product));

  useEffect(() => {
    const newCount = cartList.reduce((total, item) => total + item.quantity, 0);
    setCartCount(newCount);
  }, [cartList]);

  useEffect(() => {
    const newTotal = cartList.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    setCartTotal(newTotal);
  }, [cartList]);

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
