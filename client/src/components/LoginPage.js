import React, { useState } from 'react';
import './AuthContainer.css';

function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");
        // Redirect to another page
      } else {
        alert("Login failed: " + data.error);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <a href="#">Forgot Your Password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;
