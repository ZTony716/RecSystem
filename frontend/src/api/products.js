
import client from "./client";

export async function fetchProducts() {
  const response = await client.get("/products");
  return response.data.data;
}

export async function fetchProductById(id) {
  const response = await client.get(`/products/${id}`);
  return response.data.data;
}

export async function searchProducts(query) {
  const response = await client.get(`/products/search?q=${encodeURIComponent(query)}`);
  return response.data.data;
}