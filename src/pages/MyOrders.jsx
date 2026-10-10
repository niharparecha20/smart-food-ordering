import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyOrders.css";

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load your orders.");
          return;
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Unable to connect to the server.");
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
          View your previous food orders and their status.
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
            {orders.map((order) => (
              <article className="order-card" key={order._id}>
                <div className="order-header">
                  <div>
                    <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                    <p>
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`order-status ${String(
                      order.status
                    ).toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div
                      className="order-item"
                      key={`${order._id}-${item.foodId}-${index}`}
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span>{order.paymentMethod}</span>
                  <strong>Total: ₹{order.totalAmount}</strong>
                </div>

                <p className="order-delivery">
                  Delivery address: {order.address}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;