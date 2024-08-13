import React, { useState } from 'react';
import "./AuthContainer.css";

function RegisterPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) { 
        alert("Registration successful");
      } else {
        alert("Registration failed: " + data.error); // Display the server's error message
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
