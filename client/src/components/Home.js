import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        } else if (response.status === 401) {
          console.warn("No token provided or token is invalid. Redirecting to login.");
          setUserInfo(null);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUserInfo(null);
      }
    };

    fetchProfile();
  }, [setUserInfo, navigate]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/logout", {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        setUserInfo(null);
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">Blog</Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); logout(); }}>Logout</a>
          </>
        ) : (
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
