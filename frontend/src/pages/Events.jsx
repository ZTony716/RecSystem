import React, { useEffect, useState } from "react";
import { fetchEventsByUserId } from "../api/events";
import { getCurrentUser } from "../utils/auth";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const currentUser = getCurrentUser();
        const userId = currentUser?.user_id || 1;

        console.log("Current user:", currentUser);
        console.log("Loading events for userId:", userId);

        const data = await fetchEventsByUserId(userId);
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Tracking Events</h2>
          <p className="muted">User behavior events stored in PostgreSQL for the current user.</p>
        </div>
      </div>

      {loading ? (
        <div className="empty">Loading events...</div>
      ) : events.length === 0 ? (
        <div className="empty">No events found.</div>
      ) : (
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Product ID</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.event_id}>
                  <td>{new Date(e.event_time).toLocaleString()}</td>
                  <td>{e.event_type}</td>
                  <td>{e.product_id ?? "-"}</td>
                  <td>{e.event_value ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
