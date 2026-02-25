import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function RecommendedList({ items }) {
  return (
    <section className="section">
      <div className="section__header">
        <h2>Recommended for You</h2>
        <p className="muted">Based on your recent browsing behavior (demo rule-based).</p>
      </div>

      {items.length === 0 ? (
        <div className="empty">No recommendations yet. Go view some products!</div>
      ) : (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}