import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {

  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          setUsername(null);
          throw new Error("No token provided");
        }
      })
      .then(data => {
        setUsername(data.username);
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, []);

  function logout() {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then(response => {
        if (response.ok) {
          setUsername(null); 
          navigate("/"); 
        } else {
          console.error("Logout failed");
        }
      })
      .catch(error => {
        console.error("An error occurred during logout:", error);
      });
  }

  return (
    <header>
      <Link to="/" className="logo">Blog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
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
