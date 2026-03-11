import React, { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("123456");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { loginAuth } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await login(email, password);

      const user = result.user || result;
      const token = result.token || "";

      loginAuth(user, token);

      setMessage(`Welcome, ${user.username}`);
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Login failed");
    }
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Login</h2>
          <p className="muted">Simple demo login for the recommendation system.</p>
        </div>
      </div>

      <form className="section" onSubmit={handleSubmit}>
        <div className="stack">
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
          <button className="btn" type="submit">Login</button>
          {message && <div className="note">{message}</div>}
        </div>
      </form>
    </div>
  );
}