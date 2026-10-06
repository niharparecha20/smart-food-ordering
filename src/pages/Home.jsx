import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Delicious Food, Delivered Fast! 🍔</h1>

          <p>
            Order your favorite meals from the comfort of your home.
            Fresh, tasty and delivered to your doorstep.
          </p>

          <Link to="/menu" className="order-btn">
            Order Now
          </Link>
        </div>

        <div className="hero-image">
          <div>🍕</div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>

        <div className="category-container">

          <div className="category-card">
            <span>🍕</span>
            <h3>Pizza</h3>
          </div>

          <div className="category-card">
            <span>🍔</span>
            <h3>Burger</h3>
          </div>

          <div className="category-card">
            <span>🍜</span>
            <h3>Noodles</h3>
          </div>

          <div className="category-card">
            <span>🍛</span>
            <h3>Indian</h3>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;