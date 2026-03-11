import React, { useEffect, useState } from "react";
import { fetchEventsByUserId } from "../api/events";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchEventsByUserId(1);
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
          <p className="muted">User behavior events stored in PostgreSQL.</p>
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