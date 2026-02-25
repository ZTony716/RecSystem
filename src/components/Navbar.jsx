import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <div className="brand">
          <span className="brand__logo">✨</span>
          <span className="brand__name">RecSys Demo</span>
        </div>

        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}>
            Products
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => (isActive ? "nav__link active" : "nav__link")}>
            Events
          </NavLink>
        </nav>
      </div>
    </header>
  );
}