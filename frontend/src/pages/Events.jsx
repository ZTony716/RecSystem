import React, { useEffect, useMemo, useState } from "react";
import { fetchEventsByUserId } from "../api/events";
import { getCurrentUser } from "../utils/auth";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const currentUser = getCurrentUser();
        const userId = currentUser?.user_id || 1;
        setCurrentUserId(userId);

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

  const stats = useMemo(() => {
    const productViews = events.filter((e) => e.event_type === "product_view").length;
    const addToCart = events.filter((e) => e.event_type === "add_to_cart").length;
    const purchaseIntent = events.filter((e) => e.event_type === "purchase_intent").length;

    return {
      total: events.length,
      productViews,
      addToCart,
      purchaseIntent,
    };
  }, [events]);

  function renderEventType(type) {
    const className =
      type === "product_view"
        ? "tag tag--view"
        : type === "add_to_cart"
        ? "tag tag--cart"
        : type === "purchase_intent"
        ? "tag tag--intent"
        : "tag";

    return <span className={className}>{type}</span>;
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Tracking Events</h2>
          <p className="muted">
            User behavior events stored in PostgreSQL for the current user.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="section__header">
          <h2>Event Overview</h2>
          <p className="muted">
            This dashboard shows tracked recommendation signals for user{" "}
            <span className="mono">{currentUserId ?? "-"}</span>.
          </p>
        </div>

        <div className="statsGrid">
          <div className="kpi">
            <div className="kpi__label">Total Events</div>
            <div className="kpi__value">{stats.total}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Product Views</div>
            <div className="kpi__value">{stats.productViews}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Add to Cart</div>
            <div className="kpi__value">{stats.addToCart}</div>
          </div>
          <div className="kpi">
            <div className="kpi__label">Purchase Intent</div>
            <div className="kpi__value">{stats.purchaseIntent}</div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="empty">Loading tracking events...</div>
      ) : events.length === 0 ? (
        <div className="empty">
          No events found yet. Start exploring products to generate recommendation signals.
        </div>
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
                  <td>{renderEventType(e.event_type)}</td>
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
