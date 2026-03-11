import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts, searchProducts } from "../api/products.js";
import axios from "axios";

export default function Products() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setItems(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function onSearch(q) {
    setQuery(q);

    try {
      if (!q.trim()) {
        loadProducts();
        return;
      }

      const data = await searchProducts(q);
      setItems(data);

      await axios.post("http://localhost:5000/api/events", {
        user_id: 1,
        product_id: null,
        event_type: "search",
        event_value: q,
      });
    } catch (error) {
      console.error("Search failed:", error);
    }
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Products</h2>
          <p className="muted">Products are now loaded from PostgreSQL via Express API.</p>
        </div>
      </div>

      <SearchBar initialValue={query} onSearch={onSearch} />

      {loading ? (
        <div className="empty">Loading products...</div>
      ) : items.length === 0 ? (
        <div className="empty">No products found.</div>
      ) : (
        <div className="grid">
          {items.map((p) => (
            <ProductCard
              key={p.product_id}
              p={{
                id: p.product_id,
                name: p.product_name,
                category: p.category_name,
                price: p.price,
                desc: p.description,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}