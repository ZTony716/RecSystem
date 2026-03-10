import React, { useMemo, useState } from "react";
import { clearEvents, readEvents } from "../utils/storage.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Events() {
  const { user, isLoggedIn } = useAuth();
  const [version, setVersion] = useState(0);

  const events = useMemo(() => readEvents(), [version, user]);

  function onClear() {
    clearEvents();
    setVersion((v) => v + 1);
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Tracking Events</h2>
          <p className="muted">
            Viewing records for <b>{isLoggedIn ? user.username : "Guest"}</b>.
          </p>
        </div>
        <button className="btn btn--danger" onClick={onClear}>
          Clear Events
        </button>
      </div>

      {events.length === 0 ? (
        <div className="empty">No events yet. Go to Products and interact with items.</div>
      ) : (
        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Product</th>
                <th>Category</th>
                <th>Query</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e.id}>
                  <td className="mono">{new Date(e.ts).toLocaleString()}</td>
                  <td><span className="tag">{e.type}</span></td>
                  <td>{e.productName || "-"}</td>
                  <td>{e.category || "-"}</td>
                  <td className="mono">{e.query || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="note">
        Tip: Recommendation is based on <b>product_view</b> frequency by category.
      </div>
    </div>
  );
}