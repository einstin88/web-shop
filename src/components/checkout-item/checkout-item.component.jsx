import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

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
  const { name, imageUrl, quantity, price } = item;
  const { addItemToCart, reduceItemInCart, removeItemInCart } =
    useContext(CartContext);

  const increment = () => addItemToCart(item);
  const decrement = () => reduceItemInCart(item);
  const removal = () => removeItemInCart(item);

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
