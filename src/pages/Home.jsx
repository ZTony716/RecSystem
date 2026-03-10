import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getRecommendations } from "../utils/recommendation.js";
import RecommendedList from "../components/RecommendedList.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user, isLoggedIn } = useAuth();
  const recs = useMemo(() => getRecommendations(6), [user]);

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero__text">
          <h1>Integrated Intelligent Recommendation System</h1>
          <p className="muted">
            Current mode: <b>{isLoggedIn ? user.username : "Guest"}</b>. Browse, search,
            track behavior, and get personalized recommendations.
          </p>
          <div className="hero__actions">
            <Link className="btn" to="/products">Browse Products</Link>
            <Link className="btn btn--ghost" to="/events">View Tracking Events</Link>
          </div>
        </div>

        <div className="hero__panel">
          <div className="kpi">
            <div className="kpi__label">Tracking</div>
            <div className="kpi__value">product_view / search</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Recommendation</div>
            <div className="kpi__value">Favorite category</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">User Mode</div>
            <div className="kpi__value">{isLoggedIn ? "Logged in" : "Guest"}</div>
          </div>
        </div>
      </section>

      <RecommendedList items={recs} />
    </div>
  );
}