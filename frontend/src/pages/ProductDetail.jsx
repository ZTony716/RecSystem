import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { fetchProductById } from "../api/products.js";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);

      await axios.post("http://localhost:5000/api/events", {
        user_id: 1,
        product_id: data.product_id,
        event_type: "product_view",
        event_value: "Viewed product detail page",
      });
    } catch (error) {
      console.error("Failed to load product:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="empty">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="empty">
        Product not found. <Link to="/products">Back to Products</Link>
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
          <div className="pill">{product.category_name}</div>
          <h2 className="detail__title">{product.product_name}</h2>
          <div className="detail__price">${product.price}</div>
          <p className="detail__desc">{product.description}</p>

          <div className="detail__note">
            <b>product_view</b> event into PostgreSQL.
          </div>
        </div>

        <div className="detail__side">
          <div className="panel">
            <h3>Quick Info</h3>
            <ul className="list">
              <li><span className="muted">Product ID:</span> {product.product_id}</li>
              <li><span className="muted">Category:</span> {product.category_name}</li>
              <li><span className="muted">Price:</span> ${product.price}</li>
              <li><span className="muted">Stock:</span> {product.stock_quantity}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}