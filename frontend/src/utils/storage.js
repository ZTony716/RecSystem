const EVENTS_KEY = "demo_events_v1";

export function readEvents() {
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
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
  localStorage.removeItem(EVENTS_KEY);
}