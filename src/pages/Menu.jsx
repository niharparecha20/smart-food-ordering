import FoodCard from "../components/food/FoodCard";
import "./Menu.css";

function Menu() {
  const foods = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh cheese pizza with tomato and basil.",
      price: 249,
      image: "🍕",
    },
    {
      id: 2,
      name: "Classic Burger",
      description: "Juicy burger with cheese, lettuce and tomato.",
      price: 179,
      image: "🍔",
    },
    {
      id: 3,
      name: "Veg Noodles",
      description: "Delicious noodles with fresh vegetables.",
      price: 149,
      image: "🍜",
    },
    {
      id: 4,
      name: "Indian Thali",
      description: "Complete Indian meal with delicious dishes.",
      price: 299,
      image: "🍛",
    },
    {
      id: 5,
      name: "French Fries",
      description: "Crispy golden fries with a tasty seasoning.",
      price: 99,
      image: "🍟",
    },
    {
      id: 6,
      name: "Cold Drink",
      description: "Refreshing chilled drink.",
      price: 69,
      image: "🥤",
    },
  ];

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Choose your favorite food and enjoy!</p>
      </div>

      <div className="food-grid">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
    </div>
  );
}

export default Menu;