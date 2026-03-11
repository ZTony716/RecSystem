import client from "./client";

export async function createEvent(payload) {
  const response = await client.post("/events", payload);
  return response.data.data;
}

export async function fetchEventsByUserId(userId) {
  const response = await client.get(`/events/${userId}`);
  return response.data.data;
}