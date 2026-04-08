import client from "./client";

export async function explainRecommendations(payload) {
  const response = await client.post("/ai/explain-recommendations", payload);
  return response.data.data;
}