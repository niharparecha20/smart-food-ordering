import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
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
        setError(data.message || "Unable to load dashboard data.");
        return;
      }

      setOrders(data.orders || []);
      setError("");
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalOrders = orders.length;

  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: "🛍️",
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: "💰",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: "⏳",
    },
    {
      title: "Delivered Orders",
      value: deliveredOrders,
      icon: "✅",
    },
  ];

  if (loading) {
    return <div className="dashboard-message">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="dashboard-message dashboard-error">
        <p>{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            fetchOrders();
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-heading">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Overview of your Smart Food Ordering System.</p>
          </div>

          <button
            className="dashboard-refresh-btn"
            onClick={() => {
              setLoading(true);
              fetchOrders();
            }}
          >
            Refresh
          </button>
        </div>

        <div className="dashboard-stats">
          {stats.map((stat) => (
            <div className="dashboard-stat-card" key={stat.title}>
              <div className="dashboard-stat-icon">{stat.icon}</div>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          ))}
        </div>

        <div className="dashboard-recent">
          <div className="dashboard-recent-heading">
            <h2>Recent Orders</h2>

            <button onClick={() => navigate("/admin/orders")}>
              Manage Orders
            </button>
          </div>

          {orders.length === 0 ? (
            <p className="dashboard-empty">No orders yet.</p>
          ) : (
            <div className="dashboard-table-wrapper">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order._id}>
                      <td>#{order._id.slice(-6).toUpperCase()}</td>
                      <td>{order.customerName}</td>
                      <td>
                        ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <span
                          className={`dashboard-status ${String(
                            order.status
                          ).toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;