import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logoutAuth } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logoutAuth();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <div className="brand">
          <span className="brand__logo">✨</span>
          <Link className="brand__name" to="/">
            Recommendation System
          </Link>
        </div>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav__link active" : "nav__link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "nav__link active" : "nav__link"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "nav__link active" : "nav__link"
            }
          >
            Events
          </NavLink>
          <NavLink className="nav__link" to="/cart">
            Cart
          </NavLink>
        </nav>

        <div className="navAuth">
          {user ? (
            <>
              <span className="navAuth__user">Welcome, {user.username}</span>
              <button className="btn btn--ghost" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="btn" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
