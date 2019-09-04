import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  createWallet,
  retrieveNonce,
  signMessage,
  retrieveJwt,
  createSecret
} from "../helpers/";
import { useAuthState, useAuthDispatch } from "../auth-context";

export default function SignupForm() {
  const { isAuthenticating } = useAuthState();
  const dispatch = useAuthDispatch();
  const [email, setEmail] = useState("bobthecryptonoob@gmail.com");
  const [password, setPassword] = useState("Zn48&NJFLPjr");

  // TODO - error handling in the UI
  const emailSecret = secret => {
    axios
      .post(
        `https://api.consensys.space:8080/emailSecret`,
        JSON.stringify({ to: email, payload: secret })
      )
      .then(result => {
        // TODO - ask kenan if this result should omit the secret in return for security reasons
        console.log(result);
      })
      .catch(err => console.log(err));
  };

  const handleSignup = async () => {
    dispatch({ type: "AUTHENTICATING", payload: true });

    const wallet = await createWallet();

    const nonce = await retrieveNonce(wallet.signingKey.address);

    const signedMessage = await signMessage({ nonce, wallet });

    const jwt = await retrieveJwt({
      address: wallet.signingKey.address,
      signedMessage: signedMessage
    });
    console.log(`jwt =`, jwt);

    // TODO - do we want to persis the wallet used when signinup/logging in with email/password
    // dispatch({ type: "SET_BURNER", payload: wallet });
    dispatch({
      type: "SET_ADDRESS",
      payload: wallet.signingKey.address
    });
    dispatch({ type: "SET_AUTH_TYPE", payload: "email" });
    dispatch({ type: "SET_JWT", payload: jwt });
    dispatch({ type: "AUTHENTICATED", payload: true });
    dispatch({ type: "AUTHENTICATING", payload: false });

    // add jwt and address to local storage
    localStorage.setItem("trusat-jwt", jwt);
    localStorage.setItem("trusat-address", wallet.signingKey.address);

    const secret = createSecret(wallet.signingKey.privateKey, password);
    console.log(`address = `, wallet.address);
    console.log(`secret = `, secret);
    // TODO - email secret to the user
    emailSecret(secret);
  };

  return (
    <form
      className="sign-up-form"
      name="auth-form"
      onSubmit={event => event.preventDefault()}
    >
      <label className="sign-up-form__label">Email</label>
      <input
        className="sign-up-form__input"
        required
        type="email"
        onChange={event => setEmail(event.target.value)}
        value={email}
      />

      <label className="sign-up-form__label">Password</label>
      <input
        className="sign-up-form__input"
        required
        type="password"
        onChange={event => setPassword(event.target.value)}
        value={password}
      />

      <div className="sign-up-form__button-wrapper">
        <span className="sign-up-form__button--black">Cancel</span>
        <span className="sign-up-form__button--white" onClick={handleSignup}>
          {isAuthenticating ? `...Loading` : `Sign Up`}
        </span>
      </div>

      <div className="sign-up-form__link-to-login-wrapper">
        <p>Already a member?</p>
        <NavLink style={{ color: "white", marginTop: "1em" }} to="/login">
          Log in
        </NavLink>
      </div>
    </form>
  );
}
