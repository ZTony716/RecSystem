import React from "react";
import ProductCard from "./ProductCard.jsx";

export default function RecommendedList({
  items = [],
  title = "Recommended for You",
  subtitle = "Based on your recent browsing behavior."
}) {
  return (
    <section className="section">
      <div className="section__header">
        <h2>{title}</h2>
        <p className="muted">{subtitle}</p>
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
