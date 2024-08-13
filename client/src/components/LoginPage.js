import React from 'react';
import './AuthContainer.css';  // Import shared styles

function LoginPage() {
  return (
    <div className="auth-container">
      <h1>Sign In</h1>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <a href="#">Forgot Your Password?</a>
      <button type="button">Sign In</button>
    </div>
  );
}

export default LoginPage;
