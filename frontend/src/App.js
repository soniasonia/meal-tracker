import React from "react";
import LoginForm from "./components/LoginForm";
import CreateUserForm from "./components/CreateUserForm";
import axios from "axios";

const APP_URL = "http://0.0.0.0:8000";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    page: "",
    username: "",
    error: null,
  };
  //TODO: Diplay message in case of error network (backend unavailable)

  componentDidMount = () => {
    const isToken = localStorage.getItem("token") ? true : false;
    if (isToken) {
      this.verifyToken();
    }
  };

  async verifyToken() {
    try {
      const response = await axios.get(APP_URL + "/api/user/me/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      if (response.data && response.data.username && response.status === 200) {
        this.setState({ isLoggedIn: true, username: response.data.username });
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  onLoginSuccessful = (token) => {
    localStorage.setItem("token", token);
    this.setState({ isLoggedIn: true });
    this.setState({ page: "" });
  };

  onLogoutSuccessful = () => {
    localStorage.removeItem("token");
    console.log("Removed token in App");
    this.setState({ isLoggedIn: false });
  };

  logout = () => {

    axios.get(APP_URL + '/api/user/logout/', {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
    .then(response => {
        console.log(response);
        this.onLogoutSuccessful();
    });
}


  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? (
          <div>
            {" "}
            <br></br>Hello, you are logged in<br></br>
            <button onClick={this.logout} className="item">
          Log out
        </button>
          </div>
        ) : (
          <div className="ui placeholder segment">
            <div className="ui two column very relaxed stackable grid">
              <div className="column">
                <h3>Login</h3>
                <LoginForm url={APP_URL} trigger={this.onLoginSuccessful} />
              </div>
              <div className="column">
                <h3>Create new user</h3>
                <CreateUserForm url={APP_URL} />
              </div>
            </div>
            <div className="ui vertical divider">Or</div>
          </div>
        )}
      </div>
    );
  }