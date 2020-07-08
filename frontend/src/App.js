import React, { useState, useEffect } from 'react';
import axios from "axios";
import { APP_URL } from "./config";
import { LoginAndSignupForm } from "./components/Auth/LoginAndSignupForm";
import { setBackendAuthToken, getBackendAuthToken, isBackendAuthTokenValid, deleteBackendAuthToken } from "./session/localStorage" 

const App = () => {
  const [authorized, setAuthorized] = useState(false);

   useEffect(() => {
    isBackendAuthTokenValid() && verifyToken()
  });

  const verifyToken = async () => {
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
      console.error("Could not perform verification of user token, performing logout.", error);
    }
    return logout();
  }

  const logout = async () => {
    try {
      await axios.get(APP_URL + "/api/user/logout/", {
        headers: {
          Authorization: `Token ${getBackendAuthToken()}`,
        },
      });
    } catch (error) {
      console.error("Could not perform logout of user, wiping out local session.", error);
    }
    deleteBackendAuthToken();
    setAuthorized(false);
  }

  const authorizeBackendToken = token => {
    setBackendAuthToken(token);
    setAuthorized(true);
  };

  return (
    <div className="App">
      {authorized ? (
        <div>
          <div>
            Hello, you are authorized as {authorized}
          </div>
          <button onClick={() => logout()} className="item">
            Log out
          </button>
        </div>
      ) : <LoginAndSignupForm authorizeBackendToken={authorizeBackendToken}/>}
    </div>
  );
}

export default App;
