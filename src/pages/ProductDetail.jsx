import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";
import { logEvent } from "../utils/storage.js";
import { getRecommendations } from "../utils/recommendation.js";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const pid = Number(id);

  const product = useMemo(() => products.find((p) => p.id === pid), [pid]);

  useEffect(() => {
    if (!product) return;
    logEvent({
      type: "product_view",
      productId: product.id,
      productName: product.name,
      category: product.category,
    });
  }, [product]);

  const recs = useMemo(() => getRecommendations(4), []);

  if (!product) {
    return (
      <div className="stack">
        <div className="empty">
          Product not found. <Link to="/products">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="stack">
      <div className="breadcrumb">
        <Link to="/products">← Back</Link>
      </div>

      <section className="detail">
        <div className="detail__meta">
          <div className="pill">{product.category}</div>
          <h2 className="detail__title">{product.name}</h2>
          <div className="detail__price">${product.price}</div>
          <p className="detail__desc">{product.desc}</p>

          <div className="detail__note">
            ✅ This page logs a <b>product_view</b> event into <code>localStorage</code>.
          </div>
        </div>

        <div className="detail__side">
          <div className="panel">
            <h3>Quick Info</h3>
            <ul className="list">
              <li><span className="muted">Product ID:</span> {product.id}</li>
              <li><span className="muted">Category:</span> {product.category}</li>
              <li><span className="muted">Price:</span> ${product.price}</li>
            </ul>
            <Link className="btn btn--ghost" to="/events">View Events</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>You may also like</h2>
          <p className="muted">Recommendations update as you browse (demo).</p>
        </div>

        <div className="grid">
          {recs.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}