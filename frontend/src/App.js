import React, { useState } from 'react';
import axios from "axios";
import { APP_URL } from "./config";
import { Dashboard } from "./components/Dashboard";
import { LoginAndSignupForm } from "./components/Auth/LoginAndSignupForm";
import { setBackendAuthToken, getBackendAuthToken, deleteBackendAuthToken } from "./session/localStorage" 

const App = () => {
  const [authorized, setAuthorized] = useState(false);

  const login = async token => {
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

  return (
    <div className="App">
      {
        authorized ? 
          <Dashboard user={{name: authorized}} logoutAction={logout}/> 
        : 
          <LoginAndSignupForm loginAction={login}/>
      }
    </div>
  );
}

export default App;
