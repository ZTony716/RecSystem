import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getRecommendations } from "../utils/recommendation.js";
import RecommendedList from "../components/RecommendedList.jsx";

export default function Home() {
  const recs = useMemo(() => getRecommendations(6), []);

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero__text">
          <h1>Integrated Intelligent Recommendation System</h1>
          <p className="muted">
            React demo: browsing + search + behavior tracking + personalized recommendations (LocalStorage).
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
            <div className="kpi__label">Storage</div>
            <div className="kpi__value">localStorage</div>
          </div>
        </div>
      </section>

      <RecommendedList items={recs} />
    </div>
  );
}