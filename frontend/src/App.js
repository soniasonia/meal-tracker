import React, { useState, useEffect } from "react";
import axios from "axios";
import { APP_URL } from "./config";
import { Dashboard } from "./components/Dashboard";
import { LoginAndSignupForm } from "./components/Auth/LoginAndSignupForm";
import {
  setBackendAuthToken,
  getBackendAuthToken,
  deleteBackendAuthToken,
  isBackendAuthTokenValid,
} from "./session/localStorage";

const App = () => {
  const [authorized, setAuthorized] = useState(false);

  // If we have valid token, authorize user.
  useEffect(() => {
    if (isBackendAuthTokenValid()) {
      authorize(getBackendAuthToken());
    }
  }, []);

  /**
   * Authorize user with provided token. In case of authorization failure, logout user.
   * @param {string} token
   */
  const authorize = async (token) => {
    setBackendAuthToken(token);
    try {
      const response = await axios.get(APP_URL + "/api/user/me/", {
        headers: {
          Authorization: `Token ${getBackendAuthToken()}`,
        },
      });
      if (response.data && response.data.username && response.status === 200) {
        setAuthorized(response.data.username);
        return;
      }
    } catch (error) {
      console.error(
        "Could not perform verification of user token, performing logout.",
        error
      );
    }
    return logout();
  };

  /**
   * Logout token by calling API and destroying AuthToken session.
   */
  const logout = async () => {
    try {
      await axios.get(APP_URL + "/api/user/logout/", {
        headers: {
          Authorization: `Token ${getBackendAuthToken()}`,
        },
      });
    } catch (error) {
      console.error(
        "Could not perform logout of user, wiping out local session.",
        error
      );
    }
    deleteBackendAuthToken();
    setAuthorized(false);
  };

  return (
    <div className="App">
      {authorized ? (
        <Dashboard user={{ name: authorized }} onLogoutHook={logout} />
      ) : (
        <React.Fragment>
          <img
            style={{
              backgroundImage: `url("peas.jpg")`,
              backgroundSize: "cover",
              position: "fixed",
              top: "0",
              left: "0",
              minWidth: "100%",
              minHeight: "100%",
            }}
            alt=""
          />
          <div
            style={{
              width: "675px",
              position: "relative",
              margin: "0 auto",
              paddingTop: "15%",
            }}
          >
            <LoginAndSignupForm onLoginHook={authorize} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default App;
