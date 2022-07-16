import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

function CartIcon() {
  // For display on nav-bar
  // Handles logic for counting item in cart & displaying dropdown
  const { cartCount, cartOpen, setCartOpen } = useContext(CartContext);

  const toggleCartDropdown = () => setCartOpen(!cartOpen);

  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
