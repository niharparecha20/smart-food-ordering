
import { useCart } from "../../context/CartContext";
import "./FoodCard.css";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  const isImageUrl =
    typeof food.image === "string" &&
    /^https?:\/\//i.test(food.image);

  return (
    <div className="food-card">
      <div className="food-image">
        {isImageUrl ? (
          <img
            src={food.image}
            alt={food.name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span>{food.image || "🍽️"}</span>
        )}
      </div>

      <div className="food-info">
        <h3>{food.name}</h3>
        <p>{food.description}</p>

        <div className="food-bottom">
          <span className="food-price">
            ₹{Number(food.price).toFixed(2)}
          </span>

          <button onClick={() => addToCart(food)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
