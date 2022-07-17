// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { AuthenticationContainer } from './authentication.styles';

function Authentication() {

  /* METHOD 2 TO LOG IN USER - NOTE THE NUANCES
  // Point second button click to 'redirect auth method'. Because upon url change (ie. redirect) all components are unmounted, a special method is needed to retrieve the response after successful auth
  useEffect(async () => {
    // auth contains credentials of logged in user that we can interface with firebase
    const res = await getRedirectResult(auth);
    if (res) {
      const userDocRef = await createUserDocumentFromAuth(user);
    }
  }, []); 
  */

  return (
    <AuthenticationContainer>
      {/* <button onClick={logGoogleUser}>Sign in with Google</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google (redirect)
      </button> */}
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
}

export default Authentication;
