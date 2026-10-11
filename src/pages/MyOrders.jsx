
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

const ORDER_STEPS = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Ready",
  "Delivered",
];
function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load your orders.");
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError(err.message || "Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return <div className="orders-message">Loading your orders...</div>;
  }

  if (error) {
    return <div className="orders-message orders-error">{error}</div>;
  }

  return (
    <div className="my-orders-page">
      <div className="my-orders-container">
        <h1>My Orders</h1>
        <p className="orders-subtitle">
          Track your food orders and check their latest status.
        </p>

        {orders.length === 0 ? (
          <div className="no-orders">
            <div className="no-orders-icon">🛍️</div>
            <h2>No orders yet</h2>
            <p>Your placed orders will appear here.</p>
            <button onClick={() => navigate("/menu")}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const status = String(order.status || "Pending").toLowerCase();
              const currentStep = ORDER_STEPS.findIndex(
                (step) => step.toLowerCase() === status
              );
              const isCancelled = status === "cancelled";

              return (
                <article className="order-card" key={order._id}>
                  <div className="order-header">
                    <div>
                      <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                      <p>{new Date(order.createdAt).toLocaleString()}</p>
                    </div>

                    <span
                      className={`order-status ${status}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {isCancelled ? (
                    <div className="tracking-cancelled">
                      This order has been cancelled.
                    </div>
                  ) : (
                    <div className="order-tracking">
                      {ORDER_STEPS.map((step, index) => {
                        const completed = currentStep >= index;

                        return (
                          <div
                            key={step}
                            className={`tracking-step ${
                              completed ? "completed" : ""
                            }`}
                          >
                            <div className="tracking-circle">
                              {completed ? "✓" : index + 1}
                            </div>
                            <span>{step}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div
                        className="order-item"
                        key={`${order._id}-${item.foodId || item.name}-${index}`}
                      >
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <strong>
                          ₹{Number(item.price) * Number(item.quantity)}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <span>{order.paymentMethod}</span>
                    <strong>
                      Total: ₹{Number(order.totalAmount).toFixed(2)}
                    </strong>
                  </div>

                  <p className="order-delivery">
                    Delivery address: {order.address}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
