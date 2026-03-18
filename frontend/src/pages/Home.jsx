import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommendedList from "../components/RecommendedList.jsx";
import { fetchPopularRecommendations } from "../api/recommendations.js";

export default function Home() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const products = await fetchPopularRecommendations();
        setRecs(products);
      } catch (error) {
        console.error("Failed to load recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, []);

  return (
    <div className="stack">
      <section className="hero">
        <div className="hero__text">
          <h1>Integrated Intelligent Recommendation System</h1>
          <p className="muted">
            Full-stack system: React + Express + PostgreSQL + personalized recommendations.
          </p>
          <div className="hero__actions">
            <Link className="btn" to="/products">Browse Products</Link>
            <Link className="btn btn--ghost" to="/events">View Tracking Events</Link>
          </div>
        </div>

        <div className="hero__panel">
          <div className="kpi">
            <div className="kpi__label">Tracking</div>
            <div className="kpi__value">PostgreSQL Events</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Recommendation</div>
            <div className="kpi__value">Rule-based API</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Architecture</div>
            <div className="kpi__value">React + Express</div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="empty">Loading recommendations...</div>
      ) : (
        <RecommendedList items={recs} />
      )}
    </div>
  );
}
