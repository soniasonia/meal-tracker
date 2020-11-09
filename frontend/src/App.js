import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThemeProvider } from '@material-ui/styles';
import { APP_URL } from "./config";
import { Dashboard } from "./components/Dashboard";
import { LoginAndSignupForm } from "./components/Auth/LoginAndSignupForm";
import {theme } from "./styles/theme";
import {
  setBackendAuthToken,
  getBackendAuthToken,
  deleteBackendAuthToken,
  isBackendAuthTokenValid,
} from "./session/localStorage";
import {useAppStyles } from "./styles/theme";

const App = () => {
  const [authorized, setAuthorized] = useState(false);
  const classes = useAppStyles();

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
    <ThemeProvider theme={theme}>
    <div className="App">      
      {authorized ? (
        <Dashboard user={{ name: authorized }} onLogoutHook={logout} />
      ) : (
        <React.Fragment>
          <img className={classes.backgroundImage} alt="Background image of peas"/>
          <div className={classes.loginAndSignup}>
            <LoginAndSignupForm onLoginHook={authorize} />
          </div>
        </React.Fragment>
      )}
    </div>
    </ThemeProvider>
  );
};

export default App;
