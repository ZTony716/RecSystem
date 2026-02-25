import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="card">
      <div className="card__top">
        <div className="pill">{p.category}</div>
        <div className="price">${p.price}</div>
      </div>

      <h3 className="card__title">{p.name}</h3>
      <p className="card__desc">{p.desc}</p>

      <div className="card__actions">
        <Link className="btn btn--ghost" to={`/products/${p.id}`}>View</Link>
      </div>
    </div>
  );
}