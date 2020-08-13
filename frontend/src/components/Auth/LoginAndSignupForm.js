import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { APP_URL } from "../../config";

const LoginAndSignupForm = ({ loginAction }) => (
  <div className="ui placeholder segment">
    <div className="ui two column very relaxed stackable grid">
      <div className="column">
        <h3>Login</h3>
        <LoginForm url={APP_URL} loginAction={loginAction} />
      </div>
      <div className="column">
        <h3>Create new user</h3>
        <SignupForm url={APP_URL} />
      </div>
    </div>
    <div className="ui vertical divider">Or</div>
  </div>
)

export {
  LoginAndSignupForm
}