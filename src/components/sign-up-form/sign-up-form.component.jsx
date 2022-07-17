import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { SignUpContainer} from './sign-up-form.styles';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Input Verifications
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      // Create User
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // Create db entry for user
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user with email already in use");
      }
      console.log(error);
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={changeHandler}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={changeHandler}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}

export default SignUpForm;
