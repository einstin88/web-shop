import { useDispatch, useSelector } from "react-redux";

import {
  addItemToCart,
  reduceItemInCart,
  removeItemInCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

function CheckoutItem({ item }) {
  const dispatch = useDispatch();
  const { name, imageUrl, quantity, price } = item;
  const cartItems = useSelector(selectCartItems);

  const increment = () => dispatch(addItemToCart(cartItems, item));
  const decrement = () => dispatch(reduceItemInCart(cartItems, item));
  const removal = () => dispatch(removeItemInCart(cartItems, item));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>

      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={decrement}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={increment}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={removal}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
