import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate({ pathname: "/" });
      props.showAlert("Registration successfull!!!","success");

    } else {
      props.showAlert("Invalid Credentials","danger");

    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h2>Sign up - inotebook</h2>
        <form
          onSubmit={handleSubmit}
          className="my-3"
          id="noteForm"
          name="noteForm"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              autoComplete="name"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              autoComplete="email"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              autoComplete="password"
              minLength={5} required
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign-up
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
