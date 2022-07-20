import { useDispatch, useSelector } from "react-redux";

import { setCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectCartOpen } from "../../store/cart/cart.selector";

import { ShoppingIcon, CartIconContainer, ItemCount } from "./cart-icon.styles";

function CartIcon() {
  // For display on nav-bar
  // Handles logic for counting item in cart & displaying dropdown
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const cartOpen = useSelector(selectCartOpen);

  const toggleCartDropdown = () => dispatch(setCartOpen(!cartOpen));

  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
}

export default CartIcon;
