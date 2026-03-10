import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <div className="brand">
          <span className="brand__logo">✨</span>
          <span className="brand__name">RecSys Demo</span>
        </div>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}
          >
            Products
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}
          >
            Events
          </NavLink>
        </nav>

        <div className="navAuth">
          {isLoggedIn ? (
            <>
              <span className="navUser">Hi, {user.username}</span>
              <button className="btn btn--ghost" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <span className="navUser">Guest</span>
              <button className="btn" onClick={openAuthModal}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}