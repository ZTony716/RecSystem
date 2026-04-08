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
import { addToCart } from "../utils/cart";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [alsoViewedProducts, setAlsoViewedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [alsoViewedLoading, setAlsoViewedLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  async function loadProduct() {
    try {
      setLoading(true);
      setActionMessage("");

      const data = await fetchProductById(id);
      setProduct(data);

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

      try {
        await createEvent({
          user_id: userId,
          product_id: data.product_id,
          event_type: "product_view",
          event_value: "Viewed product detail page",
        });
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

    await createEvent({
      user_id: userId,
      product_id: product.product_id,
      event_type: "add_to_cart",
      event_value: "Added from product detail page",
    });

    addToCart(product);
    setActionMessage("Product added to cart and cart activity recorded.");
  } catch (error) {
    console.error("Failed to record add_to_cart:", error);
    setActionMessage("Failed to add product to cart.");
  }
}
  async function handleBuyNow() {
    try {
      if (!product) return;

      const currentUser = getCurrentUser();
      const userId = currentUser?.user_id || 1;

      await createEvent({
        user_id: userId,
        product_id: product.product_id,
        event_type: "purchase_intent",
        event_value: "User clicked buy now",
      });

      setActionMessage("Purchase intent recorded successfully.");
    } catch (error) {
      console.error("Failed to record purchase_intent:", error);
      setActionMessage("Failed to record purchase intent.");
    }
  }

  if (loading) {
    return <div className="empty">Loading product details...</div>;
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
        <Link to="/products">← Back to Products</Link>
      </div>

      <section className="detail">
        <div className="detail__meta">
          <div className="pill">{product.category_name}</div>
          <h2 className="detail__title">{product.product_name}</h2>
          <div className="detail__price">${product.price}</div>
          <p className="detail__desc">{product.description}</p>

          <div className="detail__note">
            This page contributes user behavior signals to the recommendation engine.
          </div>

          <div className="detail__actions">
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn--ghost" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {actionMessage ? <div className="note">{actionMessage}</div> : null}
        </div>

        <div className="detail__side">
          <div className="panel">
            <h3>Quick Info</h3>
            <ul className="list">
              <li>
                <span className="muted">Product ID:</span> {product.product_id}
              </li>
              <li>
                <span className="muted">Category:</span> {product.category_name}
              </li>
              <li>
                <span className="muted">Price:</span> ${product.price}
              </li>
              <li>
                <span className="muted">Stock:</span> {product.stock_quantity}
              </li>
            </ul>
          </div>

          <div className="panel">
            <h3>Recommendation Signals</h3>
            <ul className="list">
              <li><span className="muted">Content-based:</span> category + price similarity</li>
              <li><span className="muted">Behavior-based:</span> co-view relationships</li>
              <li><span className="muted">Tracking:</span> product view, cart, purchase intent</li>
            </ul>
          </div>
        </div>
      </section>

      {similarLoading ? (
        <div className="empty">Loading similar recommendations...</div>
      ) : (
        <RecommendedList
          items={similarProducts}
          title="Similar Products"
          subtitle="Recommended by category similarity and price proximity."
          variant="similar"
        />
      )}

      {alsoViewedLoading ? (
        <div className="empty">Loading customer behavior recommendations...</div>
      ) : (
        <RecommendedList
          items={alsoViewedProducts}
          title="Customers Also Viewed"
          subtitle="Recommended from co-view behavior of users who explored this product."
          variant="alsoViewed"
        />
      )}
    </div>
  );
}
