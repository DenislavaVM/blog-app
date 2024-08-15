import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    })
    .then(response => {
      if (response.ok) {
        setUserInfo(null);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    })
    .catch(error => {
      console.error("An error occurred during logout:", error);
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Blog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
