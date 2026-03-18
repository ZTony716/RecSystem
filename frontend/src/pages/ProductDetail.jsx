import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../api/products.js";
import {
  fetchSimilarRecommendations,
  fetchAlsoViewedRecommendations,
} from "../api/recommendations.js";
import { createEvent } from "../api/events.js";
import { getCurrentUser } from "../utils/auth";
import RecommendedList from "../components/RecommendedList.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [alsoViewedProducts, setAlsoViewedProducts] = useState([]);
  const [alsoViewedLoading, setAlsoViewedLoading] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);

      const data = await fetchProductById(id);
      setProduct(data);

      // Load similar recommendations
      try {
        setSimilarLoading(true);
        const similar = await fetchSimilarRecommendations(data.product_id);
        setSimilarProducts(similar);
      } catch (similarError) {
        console.error("Failed to load similar recommendations:", similarError);
        setSimilarProducts([]);
      } finally {
        setSimilarLoading(false);
      }
      // Load also-viewed recommendations
      try {
        setAlsoViewedLoading(true);
        const alsoViewed = await fetchAlsoViewedRecommendations(data.product_id);
        setAlsoViewedProducts(alsoViewed);
      } catch (alsoViewedError) {
        console.error("Failed to load also-viewed recommendations:", alsoViewedError);
        setAlsoViewedProducts([]);
      } finally {
        setAlsoViewedLoading(false);
      }

      const currentUser = getCurrentUser();
      const userId = currentUser?.user_id || 1;

      console.log("currentUser:", currentUser);
      console.log("event payload:", {
        user_id: userId,
        product_id: data.product_id,
        event_type: "product_view",
        event_value: "Viewed product detail page",
      });

      try {
        const eventData = await createEvent({
          user_id: userId,
          product_id: data.product_id,
          event_type: "product_view",
          event_value: "Viewed product detail page",
        });

        console.log("Event created:", eventData);
      } catch (eventError) {
        console.error("Failed to create event:", eventError);
      }
    } catch (error) {
      console.error("Failed to load product:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddToCart() {
    try {
      if (!product) return;

      const currentUser = getCurrentUser();
      const userId = currentUser?.user_id || 1;

      const eventData = await createEvent({
        user_id: userId,
        product_id: product.product_id,
        event_type: "add_to_cart",
        event_value: "Added from product detail page",
      });

      console.log("Add to cart event created:", eventData);
      alert("Add to cart event recorded");
    } catch (error) {
      console.error("Failed to record add_to_cart:", error);
    }
  }

  async function handleBuyNow() {
    try {
      if (!product) return;

      const currentUser = getCurrentUser();
      const userId = currentUser?.user_id || 1;

      const eventData = await createEvent({
        user_id: userId,
        product_id: product.product_id,
        event_type: "purchase_intent",
        event_value: "User clicked buy now",
      });

      console.log("Purchase intent event created:", eventData);
      alert("Purchase intent recorded");
    } catch (error) {
      console.error("Failed to record purchase_intent:", error);
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
             User interaction events are being tracked for recommendation improvement.
          </div>

          <div className="detail__actions">
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn--ghost" onClick={handleBuyNow}>
              Buy Now
            </button>
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

      {similarLoading ? (
        <div className="empty">Loading similar products...</div>
      ) : (
        <RecommendedList
          items={similarProducts}
          title="Similar Products"
          subtitle="Products in the same category with similar prices."
        />
      )}
      {alsoViewedLoading ? (
        <div className="empty">Loading also-viewed products...</div>
      ) : (
        <RecommendedList
          items={alsoViewedProducts}
          title="Customers Also Viewed"
          subtitle="Products frequently viewed by users who explored this item."
        />
      )}
    </div>
  );
}
