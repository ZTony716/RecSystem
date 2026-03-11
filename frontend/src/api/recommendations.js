import client from "./client";

export async function fetchRecommendations(userId) {
  const response = await client.get(`/recommendations/${userId}`);
  return response.data.data;
}