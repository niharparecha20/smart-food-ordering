import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>

        <h1>Your Cart is Empty</h1>

        <p>Add some delicious food to your cart.</p>

        <Link to="/menu" className="shop-btn">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button onClick={clearCart} className="clear-btn">
          Clear Cart
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-image">
                {item.image}
              </div>

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>₹{item.price} each</p>
              </div>

              <div className="quantity-control">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                ₹{item.price * item.quantity}
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
  className="checkout-btn"
  onClick={() => window.location.href = "/checkout"}
>
  Proceed to Checkout
</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;