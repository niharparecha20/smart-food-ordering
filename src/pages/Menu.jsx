
import { useEffect, useMemo, useState } from "react";
import FoodCard from "../components/food/FoodCard";
import "./Menu.css";

function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/foods");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load menu.");
        }

        const menuFoods = (data.foods || [])
          .filter((food) => food.isAvailable !== false)
          .map((food) => ({
            ...food,
            id: food._id,
            image: food.image || "🍽️",
          }));

        setFoods(menuFoods);
      } catch (err) {
        setError(err.message || "Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        foods
          .map((food) => food.category?.trim())
          .filter(Boolean)
      ),
    ];
  }, [foods]);

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const searchText = search.trim().toLowerCase();

      const matchesSearch =
        food.name?.toLowerCase().includes(searchText) ||
        food.description?.toLowerCase().includes(searchText) ||
        food.category?.toLowerCase().includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        food.category?.toLowerCase() ===
          selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [foods, search, selectedCategory]);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Choose your favorite food and enjoy!</p>
      </div>

      <div className="menu-filters">
        <input
          type="search"
          className="menu-search"
          placeholder="Search food by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search food"
        />

        <div className="menu-categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                selectedCategory === category ? "active" : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading food menu...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : filteredFoods.length === 0 ? (
        <p className="menu-empty">
          No food items found. Try another search or category.
        </p>
      ) : (
        <>
          <p className="menu-results">
            Showing {filteredFoods.length} food item(s)
          </p>

          <div className="food-grid">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Menu;
