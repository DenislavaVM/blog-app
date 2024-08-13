import React, { useState } from 'react';
import './AuthContainer.css';

function RegisterPage() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(ev) {
    ev.preventDefault();
    await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
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
