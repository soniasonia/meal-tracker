import React, { useState } from "react";
import axios from "axios";
import {useFormStyles} from "../../styles/theme";


const LoginForm = ({ url, authorizeTokenAction }) => {
  const [ formData, setFormData ] = useState({ login: "", password: "" });
  const [ error, setError ] = useState(false);

  const formClasses = useFormStyles();

  const submit = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(url + "/api/user/login/", {
        username: formData.login,
        password: formData.password,
      });
      if (response.data && response.data.token && response.status === 200) {
        authorizeTokenAction(response.data.token);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.status === 400
      ) {
        setError(error.response.data);
        return;
      }
      setError({ non_field_errors: error.toString() });
    }
    setError(false);
  }

  return (
    <div style={{ margin: 10 }}>
      <form
        onSubmit={(event) => submit(event)}
        className="ui form"
      >
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            value={formData.login}
            onChange={(e) => setFormData({ ...formData, login: e.target.value })}
          />
          {error && error.username ? (
            <div className={formClasses.fieldError}>
              {error.username}
            </div>
          ) : null}
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          {error.password ? (
            <div className={formClasses.fieldError}>
              {error.password}
            </div>
          ) : null}
        </div>

        {error.non_field_errors ? (
          <center><div className={formClasses.error}>
            { error.non_field_errors }
          </div><br></br><br></br></center>
        ) : null}

        <button type="submit" className="ui button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
