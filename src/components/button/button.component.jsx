import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles";

export const BUTTON_TYPES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

function getButton(buttonType = BUTTON_TYPES.base) {
  return {
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleSignInButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
  }[buttonType];
}

function Button({ children, buttonType, ...otherProps }) {
  const CustomButton = getButton(buttonType);

  return <CustomButton {...otherProps}>{children}</CustomButton>;
}

export default Button;
