import client from "./client";

export async function explainRecommendations(payload) {
  const response = await client.post("/ai/explain-recommendations", payload);
  return response.data.data;
}

export async function askAssistant(payload) {
  const response = await client.post("/ai/assistant", payload);
  return response.data.data;
}