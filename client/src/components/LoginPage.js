import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import "./AuthContainer.css";
import { UserContext } from "../context/UserContext";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setUserInfo(data);
      setRedirect(true);
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert(error.message);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <form onSubmit={login}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default LoginPage;
