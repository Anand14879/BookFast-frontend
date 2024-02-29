import React, { useState } from "react";
import "../css/Login.css"; // Make sure this CSS file is created with the styles for your login form
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function logIn(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    let item = { email, password };
    let response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    // let result = await response.json();
    // localStorage.setItem("user-info", JSON.stringify(result));
    // if (response.ok) {
    //   navigate("/venues", { replace: true });
    // } else {
    //   setError(result.message || "An error occurred during registration.");
    // }

    let result = await response.json();

    if (response.ok) {
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/venues", { replace: true });
    } else {
      setError(result.error || "Invalid email or password."); // Display the error
      // Do not store anything in local storage
    }
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <div className="card-body">
            <h2 className="login-title">Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={logIn}>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
