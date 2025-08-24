import React, { useState } from "react";
import "./Login.css";
import PopupMessage from "../../components/PopupMessage/PopupMessage.jsx";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setPopup({ message: "Login Successful 🎉", type: "success" });
      } else {
        setPopup({ message: data.message || "Invalid Credentials ❌", type: "error" });
      }
    } catch (error) {
      setPopup({ message: "Server Error 🚨", type: "error" });
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>

      {/* Popup */}
      <PopupMessage
        message={popup.message}
        type={popup.type}
        onClose={() => setPopup({ message: "", type: "" })}
      />
    </div>
  );
};

export default Login;
