import React, { useEffect, useMemo, useState } from "react";
import {
  getCart,
  removeFromCart,
  clearCart,
  updateCartQuantity,
  getCartTotal,
} from "../utils/cart";
import { createEvent } from "../api/events";
import { getCurrentUser } from "../utils/auth";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = useMemo(() => getCartTotal(), [cart]);

  function handleRemove(productId) {
    const updated = removeFromCart(productId);
    setCart(updated);
    setMessage("Item removed from cart.");
  }

  function handleQuantityChange(productId, value) {
    const updated = updateCartQuantity(productId, value);
    setCart(updated);
    setMessage("");
  }

  function handleClearCart() {
    clearCart();
    setCart([]);
    setMessage("Cart cleared.");
  }

  async function handleMockCheckout() {
    try {
      const currentUser = getCurrentUser();
      const userId = currentUser?.user_id || 1;

      for (const item of cart) {
        await createEvent({
          user_id: userId,
          product_id: item.product_id,
          event_type: "purchase_intent",
          event_value: "Mock checkout from cart page",
        });
      }

      clearCart();
      setCart([]);
      setMessage("Mock checkout completed. Purchase intent events were recorded.");
    } catch (error) {
      console.error("Failed to complete mock checkout:", error);
      setMessage("Failed to complete mock checkout.");
    }
  }

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h2>Shopping Cart</h2>
          <p className="muted">
            Cart actions help simulate stronger recommendation signals.
          </p>
        </div>
      </div>

      {message ? <div className="note">{message}</div> : null}

      {cart.length === 0 ? (
        <div className="empty">
          Your cart is empty. Add products from the detail page to build a stronger recommendation journey.
        </div>
      ) : (
        <>
          <section className="section">
            <div className="section__header">
              <h2>Cart Items</h2>
              <p className="muted">
                Review selected products and simulate checkout behavior.
              </p>
            </div>

            <div className="tableWrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.product_id}>
                      <td>{item.product_name}</td>
                      <td>{item.category_name || "-"}</td>
                      <td>${Number(item.price).toFixed(2)}</td>
                      <td>
                        <input
                          className="cartQtyInput"
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.product_id, e.target.value)
                          }
                        />
                      </td>
                      <td>
                        ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn--ghost"
                          onClick={() => handleRemove(item.product_id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="section">
            <div className="section__header">
              <h2>Cart Summary</h2>
              <p className="muted">
                Mock checkout records purchase-intent events for the recommendation engine.
              </p>
            </div>

            <div className="cartSummary">
              <div className="kpi">
                <div className="kpi__label">Unique Items</div>
                <div className="kpi__value">{cart.length}</div>
              </div>
              <div className="kpi">
                <div className="kpi__label">Total</div>
                <div className="kpi__value">${total.toFixed(2)}</div>
              </div>
            </div>

            <div className="detail__actions">
              <button className="btn" onClick={handleMockCheckout}>
                Mock Checkout
              </button>
              <button className="btn btn--ghost" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}