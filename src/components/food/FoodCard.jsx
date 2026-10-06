import { useCart } from "../../context/CartContext";
import "./FoodCard.css";

function FoodCard({ food }) {
  const { addToCart } = useCart();

  return (
    <div className="food-card">
      <div className="food-image">
        {food.image}
      </div>

      <div className="food-info">
        <h3>{food.name}</h3>

        <p>{food.description}</p>

        <div className="food-bottom">
          <span className="food-price">₹{food.price}</span>

          <button onClick={() => addToCart(food)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;