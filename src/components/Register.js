import React, { useEffect, useState } from "react";
import "../css/Register.css"; // Update this path if necessary
import { useNavigate } from "react-router-dom";
import Header from "./Header";
function Register() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/home", { replace: true });
    }
  });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function signUp(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    let item = { name, password, email, phone };
    try {
      let response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      let result = await response.json();
      console.log(result);
      localStorage.setItem("user-info", JSON.stringify(result));
      if (response.ok) {
        navigate("/venues", { replace: true });
      } else if (response.status === 409) {
        // Handle the duplicate email error
        setError(result.message || "The email has already been taken.");
      } else {
        setError(result.message || "An error occurred during registration.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An error occurred during registration.");
    }
  }

  return (
    <>
      <Header />
      <div className="register-container">
        <div className="register-card">
          <div className="card-body">
            <h2 className="register-title">Register</h2>
            {error && <div className="error-message">{error}</div>}
            {/* Error message will be displayed here */}
            <form onSubmit={signUp}>
              <div className="form-group">
                <br />
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  placeholder="Enter Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
