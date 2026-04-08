import React, { useState } from "react";
import { register } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await register(username, email, password);
      const user = result.user || result;
      const token = result.token || "";

      loginAuth(user, token);
      setMessage(`Welcome, ${user.username}`);
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Register failed");
    }
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Register</h2>
          <p className="muted">Create your account.</p>
        </div>
      </div>

      <form className="section" onSubmit={handleSubmit}>
        <div className="stack">
          <input
            className="search__input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="search__input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="search__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="btn" type="submit">Register</button>
          {message && <div className="note">{message}</div>}
        </div>
      </form>

      <div className="note">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}