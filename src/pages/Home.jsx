
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/foods");
        const data = await response.json();

        if (response.ok) {
          setFoods(data.foods || []);
        }
      } catch (error) {
        console.error("Unable to load category images:", error);
      }
    };

    fetchFoods();
  }, []);

  const categories = [
    { name: "Pizza", foodName: "Margherita Pizza" },
    { name: "Burger", foodName: "Classic Burger" },
    { name: "Noodles", foodName: "Veg Noodles" },
    { name: "Indian", foodName: "Paneer Butter Masala" },
  ];

  const getFoodImage = (foodName) =>
    foods.find(
      (food) => food.name?.toLowerCase() === foodName.toLowerCase()
    )?.image;

  const openCategory = (category) => {
    navigate(`/menu?category=${encodeURIComponent(category)}`);
  };

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

      {/* Popular Categories */}
      <section className="categories">
        <h2>Popular Categories</h2>

        <div className="category-container">
          {categories.map((category) => {
            const image = getFoodImage(category.foodName);

            return (
              <button
                type="button"
                className="category-card"
                key={category.name}
                onClick={() => openCategory(category.name)}
              >
                {image && /^https?:\/\//i.test(image) ? (
                  <img
                    src={image}
                    alt={category.name}
                    className="category-image"
                  />
                ) : (
                  <span className="category-emoji">
                    {category.name === "Pizza"
                      ? "🍕"
                      : category.name === "Burger"
                      ? "🍔"
                      : category.name === "Noodles"
                      ? "🍜"
                      : "🍛"}
                  </span>
                )}

                <h3>{category.name}</h3>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
