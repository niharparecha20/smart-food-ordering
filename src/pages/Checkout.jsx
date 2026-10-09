import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css";
function Checkout() {
  const navigate = useNavigate();

  const { cartItems } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    alert("Order placed successfully! 🎉");

    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Your Cart is Empty</h1>
        <p>Add some food before going to checkout.</p>

        <button onClick={() => navigate("/menu")}>
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-card">
          <h1>Checkout</h1>
          <p className="checkout-subtitle">
            Enter your delivery details
          </p>

          <form onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
               <input
  type="tel"
  placeholder="Enter 10-digit mobile number"
  value={phone}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
  }}
  pattern="[0-9]{10}"
  title="Please enter exactly 10 digits."
  maxLength={10}
  required
/>
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <textarea
                placeholder="Enter your complete delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Payment Method</label>

              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Credit / Debit Card</option>
              </select>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <strong>
                ₹{item.price * item.quantity}
              </strong>
            </div>
          ))}

          <hr />

          <div className="checkout-total">
            <span>Total</span>
            <strong>₹{total}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;