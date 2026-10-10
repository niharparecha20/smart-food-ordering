import { useCallback, useEffect, useState } from "react";
import "./AdminOrders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in to view orders.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load orders.");
        return;
      }

      setOrders(data.orders || []);
      setError("");
    } catch (err) {
      console.error("Fetch admin orders error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleStatusChange = async (orderId, status) => {
    const token = localStorage.getItem("token");

    setUpdatingId(orderId);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to update order status.");
        return;
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: data.order.status }
            : order
        )
      );
    } catch (err) {
      console.error("Update order status error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setUpdatingId("");
    }
  };

  if (loading) {
    return <div className="admin-orders-message">Loading orders...</div>;
  }

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-container">
        <div className="admin-orders-heading">
          <div>
            <h1>Order Management</h1>
            <p>View and manage customer orders.</p>
          </div>

          <button
            className="refresh-orders-btn"
            onClick={() => {
              setLoading(true);
              fetchOrders();
            }}
          >
            Refresh
          </button>
        </div>

        {error && <p className="admin-orders-error">{error}</p>}

        {orders.length === 0 ? (
          <div className="admin-orders-empty">
            <h2>No orders found</h2>
            <p>Customer orders will appear here.</p>
          </div>
        ) : (
          <div className="admin-orders-list">
            {orders.map((order) => (
              <article className="admin-order-card" key={order._id}>
                <div className="admin-order-header">
                  <div>
                    <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
                    <p>
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <span
                    className={`admin-order-status ${String(
                      order.status
                    ).toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="admin-order-details">
                  <p><strong>Customer:</strong> {order.customerName}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>

                <div className="admin-order-items">
                  {order.items.map((item, index) => (
                    <div
                      className="admin-order-item"
                      key={`${order._id}-${item.foodId}-${index}`}
                    >
                      <span>{item.name} × {item.quantity}</span>
                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

                <div className="admin-order-footer">
                  <strong>Total: ₹{order.totalAmount}</strong>

                  <label className="admin-status-control">
                    Update status
                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </label>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;