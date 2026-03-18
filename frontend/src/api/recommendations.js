import client from "./client";

export async function fetchUserRecommendations(userId) {
  const response = await client.get(`/recommendations/user/${userId}`);
  return response.data.data;
}

export async function fetchPopularRecommendations() {
  const response = await client.get("/recommendations/popular");
  return response.data.data;
}

export async function fetchSimilarRecommendations(productId) {
  const response = await client.get(`/recommendations/similar/${productId}`);
  return response.data.data;
}

export async function fetchAlsoViewedRecommendations(productId) {
  const response = await client.get(`/recommendations/also-viewed/${productId}`);
  return response.data.data;
}
