import { products } from "../data/products.js";
import { readEvents } from "./storage.js";

/**
 * Demo recommendation rules:
 * 1) If user has viewed products, infer favorite category by view frequency.
 * 2) Recommend top N products in that category that user hasn't just viewed.
 * 3) If no history, recommend popular defaults (first N).
 */
export function getRecommendations(limit = 5) {
  const events = readEvents();

  const views = events.filter((e) => e.type === "product_view" && e.productId);
  if (views.length === 0) {
    return products.slice(0, limit);
  }

  const catCount = {};
  const recentlyViewedIds = new Set();
  for (const v of views) {
    catCount[v.category] = (catCount[v.category] || 0) + 1;
    recentlyViewedIds.add(v.productId);
  }

  const favoriteCategory = Object.keys(catCount).sort((a, b) => catCount[b] - catCount[a])[0];

  const candidates = products
    .filter((p) => p.category === favoriteCategory && !recentlyViewedIds.has(p.id));

  // If user viewed all in the category, just show category products anyway
  const fallback = products.filter((p) => p.category === favoriteCategory);

  const recs = (candidates.length > 0 ? candidates : fallback).slice(0, limit);

  return recs;
}