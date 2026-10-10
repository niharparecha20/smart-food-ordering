import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

const { user, isLoggedIn, logout } = useAuth();  const { cartItems } = useCart();
  const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🍔 Smart Food
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">
  Cart 🛒 {cartCount > 0 && `(${cartCount})`}
  </Link>

        {isLoggedIn ? (
  <>
    <Link to="/profile">Profile</Link>

    <Link to="/my-orders">My Orders</Link>
    {user?.role === "admin" && (
  <>
    <Link to="/admin/dashboard">Dashboard</Link>
    <Link to="/admin/orders">Manage Orders</Link>
    <Link to="/admin/food">Manage Food</Link>
  </>
)}

    <button
      onClick={handleLogout}
      className="logout-btn"
    >
      Logout
    </button>
  </>
) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;