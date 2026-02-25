import React, { useMemo, useState } from "react";
import { products } from "../data/products.js";
import SearchBar from "../components/SearchBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { logEvent } from "../utils/storage.js";

export default function Products() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
      );
    });
  }, [query]);

  function onSearch(q) {
    setQuery(q);
    logEvent({ type: "search", query: q });
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Products</h2>
          <p className="muted">Search + browse products. Clicking a product logs a view event.</p>
        </div>
      </div>

      <SearchBar initialValue={query} onSearch={onSearch} />

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {filtered.length === 0 && <div className="empty">No products found. Try another keyword.</div>}
    </div>
  );
}