import React, { useEffect } from "react";
import "../css/Login.css"; // Make sure this CSS file is created with the styles for your login form
import Header from "./Header";
import { useNavigate } from "react-router-dom";

function Login() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/home", { replace: true });
    }
  });
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-card">
          <div className="card-body">
            <h2 className="login-title">Login</h2>
            <form>
              <div className="form-group">
                <input type="email" id="email" placeholder="Enter email" />
              </div>
              <div className="form-group">
                <input type="password" id="password" placeholder="Password" />
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
