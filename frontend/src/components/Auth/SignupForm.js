import React, { useState } from "react";
import axios from "axios";
import { errorStyle } from "./_styles"

const CreateUserForm = ({ url }) => {
  const [ formData, setFormData ] = useState({ login: "", password: "", email: "" });
  const [ formResponse, setFormResponse ] = useState({ created: false });
  const [ error, setError ] = useState(false);

  const submit = async event => {
    event.preventDefault();
    try {
      await axios.post(url + "/api/user/create/", {
        username: formData.login,
        password: formData.password,
        email: formData.email,
      });
      setFormResponse({ created: true });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.status === 400
      ) {
        setError(error.response.data)
        return;
      }
      setError({ non_field_errors: error.toString() })
    }
    setError(false);
  }

  return (
    <div style={{ margin: 10 }}>
      {formResponse.created ? (
        <div className="ui success message">
          <div className="header">User {formResponse.created} created</div>
          <p>You may now log-in with your username and password</p>
        </div>
      ) : (
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
            {error.username ? (
              <div className="ui pointing basic label" style={errorStyle}>
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
              <div className="ui pointing basic label" style={errorStyle}>
                {error.password}
              </div>
            ) : null}
          </div>

          {error.non_field_errors ? (
            <div className="ui negative message" style={errorStyle}>
              {error.non_field_errors}
            </div>
          ) : null}

          <button type="submit" className="ui button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateUserForm;
