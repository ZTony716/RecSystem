import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  const id = p.id || p.product_id;
  const name = p.name || p.product_name;
  const desc = p.desc || p.description;
  const category = p.category || p.category_name || (p.category_id ? `Category ${p.category_id}` : "Uncategorized");

  return (
    <div className="card">
      <div className="card__top">
        <div className="pill">{category}</div>
        <div className="price">${p.price}</div>
      </div>

      <h3 className="card__title">{name}</h3>
      <p className="card__desc">{desc}</p>

      <div className="card__actions">
        <Link className="btn btn--ghost" to={`/products/${id}`}>
          View
        </Link>
      </div>
    </div>
  );
}
