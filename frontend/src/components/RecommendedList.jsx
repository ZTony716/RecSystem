import React from "react";
import ProductCard from "./ProductCard.jsx";

const variantLabelMap = {
  popular: "Popular",
  personalized: "Personalized",
  similar: "Similar",
  alsoViewed: "Also Viewed",
};

export default function RecommendedList({
  items = [],
  title = "Recommended for You",
  subtitle = "Based on your recent browsing behavior.",
  variant = "personalized",
}) {
  const tagLabel = variantLabelMap[variant] || "Recommended";

  return (
    <section className="section">
      <div className="section__header">
        <h2>{title}</h2>
        <p className="muted">{subtitle}</p>
      </div>

      {items.length === 0 ? (
        <div className="empty">
          No recommendations available yet. Start exploring products to generate recommendation signals.
        </div>
      ) : (
        <div className="grid">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} recommendationTag={tagLabel} />
          ))}
        </div>
      )}
    </section>
  );
}
