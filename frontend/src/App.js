import React from 'react';
import LoginForm from "./components/LoginForm";
import CreateUserForm from "./components/CreateUserForm";

const APP_URL = "http://0.0.0.0:8000";

 const onLoginSuccessful = (token) => {
    localStorage.setItem("token", token);
    this.setState({ isLoggedIn: true });
    this.setState({ page: "" });
  };

function App() {
  return (
    <div className="App">
        <div className="ui placeholder segment">
              <div className="ui two column very relaxed stackable grid">
                <div className="column">
                  <h3>Login</h3>
                  <LoginForm url={APP_URL} trigger={onLoginSuccessful} />
                </div>
                <div className="column">
                  <h3>Create new user</h3>
                  <CreateUserForm url={APP_URL} />
                </div>
              </div>
              <div className="ui vertical divider">Or</div>
            </div>
          </div>
  );
}

export default App;
