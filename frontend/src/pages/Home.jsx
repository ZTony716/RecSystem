import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommendedList from "../components/RecommendedList.jsx";
import { fetchPopularRecommendations } from "../api/recommendations.js";
import { explainRecommendations } from "../api/ai";

export default function Home() {
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiExplanation, setAiExplanation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  async function loadAiExplanation(recommendations) {
    try {
      setAiLoading(true);

      const result = await explainRecommendations({
        topCategories: ["Electronics", "Sports"],
        recentEventTypes: ["product_view", "add_to_cart"],
        recommendations: recommendations.map((item) => ({
          name: item.name,
          category: item.category,
        })),
      });

      setAiExplanation(result);
    } catch (error) {
      console.error("Failed to load AI explanation:", error);
      setAiExplanation(null);
    } finally {
      setAiLoading(false);
    }
  }

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const products = await fetchPopularRecommendations();
        setRecs(products);

        if (products.length > 0) {
          await loadAiExplanation(products);
        }
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
            A full-stack recommendation demo powered by React, Express, PostgreSQL,
            weighted ranking logic, and AI-enhanced explanation.
          </p>

          <div className="hero__actions">
            <Link className="btn" to="/products">
              Browse Products
            </Link>
            <Link className="btn btn--ghost" to="/events">
              View Tracking Events
            </Link>
          </div>
        </div>

        <div className="hero__panel">
          <div className="kpi">
            <div className="kpi__label">Tracking</div>
            <div className="kpi__value">Behavior Events Stored</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Ranking Logic</div>
            <div className="kpi__value">Weighted Recommendation</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">AI Module</div>
            <div className="kpi__value">Recommendation Explanation</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>System Highlights</h2>
          <p className="muted">
            The current system combines user behavior tracking, weighted ranking,
            personalized recommendation logic, and AI-generated explanation.
          </p>
        </div>

        <div className="hero__actions">
          <span className="pill">Behavior Tracking</span>
          <span className="pill">Weighted Popular Ranking</span>
          <span className="pill">Personalized Recommendation</span>
          <span className="pill">AI Explanation</span>
        </div>
      </section>

      {aiLoading ? (
        <div className="note">Generating AI explanation for the current recommendations...</div>
      ) : aiExplanation ? (
        <section className="section">
          <div className="section__header">
            <h2>Why These Recommendations?</h2>
            <p>{aiExplanation.summary}</p>
          </div>

          {aiExplanation.reasons?.length > 0 && (
            <ul className="list">
              {aiExplanation.reasons.map((item, index) => (
                <li key={index}>
                  <span className="muted">{item.productName}:</span> {item.reason}
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <div className="note">
          Recommendation explanations are unavailable right now, but the ranking system is still working normally.
        </div>
      )}

      {loading ? (
        <div className="empty">Loading weighted recommendations...</div>
      ) : (
        <RecommendedList
          items={recs}
          title="Trending Recommendations"
          subtitle="Ranked by weighted user engagement signals, including views, cart activity, and purchase intent."
          variant="popular"
        />
      )}
    </div>
  );
}
