import { useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button, { BUTTON_TYPES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Point 'button click' to popup auth method
  const signInWithGoogle = () => {
    signInWithGooglePopup();
  };

  // Handles typing inputs
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  // Handles submitting form and signing-in
  const submitHandler = (event) => {
    event.preventDefault();

    // Sign User In
    signInAuthUserWithEmailAndPassword(email, password)
      .then(setFormFields(defaultFormFields))
      .catch((error) => {
        switch (error.code) {
          case "auth/wrong-password":
            alert("Incorrect email/password");
            break;
          case "auth/user-not-found":
            alert("Incorrect email/password");
            break;
          default:
            console.log(error);
        }
      });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have and account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={changeHandler}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={changeHandler}
          name="password"
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignInForm;
