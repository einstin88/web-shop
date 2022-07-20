import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import { CartDropdownContainer, EmptyMessage, CartItems} from "./cart-dropdown.styles";
import { selectCartItems } from "../../store/cart/cart.selector";

function CartDropdown() {
  const cartList = useSelector(selectCartItems)
  const navigate = useNavigate();

  const toCheckOut = () => navigate("/checkout");

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartList.length ? (
          cartList.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={toCheckOut} >CHECKOUT</Button>
    </CartDropdownContainer>
  );
}

export default CartDropdown;
