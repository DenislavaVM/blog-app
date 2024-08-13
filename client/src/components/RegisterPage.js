import React from 'react';
import './AuthContainer.css';  // Import shared styles

function RegisterPage() {
  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="button">Sign Up</button>
    </div>
  );
}

export default RegisterPage;
