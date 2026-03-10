import { getCurrentUser } from "./auth.js";

function getEventsKey() {
  const user = getCurrentUser();
  return user ? `demo_events_${user.id}` : "demo_events_guest";
}

export function readEvents() {
  try {
    const raw = localStorage.getItem(getEventsKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeEvents(events) {
  localStorage.setItem(getEventsKey(), JSON.stringify(events));
}

export function logEvent(event) {
  const events = readEvents();

  events.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
    ts: new Date().toISOString(),
    ...event,
  });

  writeEvents(events);
}

export function clearEvents() {
  localStorage.removeItem(getEventsKey());
}