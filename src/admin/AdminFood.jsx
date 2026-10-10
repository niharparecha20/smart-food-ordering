
import { useEffect, useState } from "react";
import "./AdminFood.css";

const API_URL = "http://localhost:5000/api/foods";

function AdminFood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const getToken = () => localStorage.getItem("token");

  const fetchFoods = async () => {
    try {
      setError("");
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load food items.");
      }

      setFoods(data.foods || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save food item.");
      }

      alert(data.message || "Food item saved successfully.");
      resetForm();
      await fetchFoods();
    } catch (err) {
      setError(err.message || "Unable to save food item.");
    }
  };

  const handleEdit = (food) => {
    setEditingId(food._id);
    setForm({
      name: food.name || "",
      description: food.description || "",
      price: String(food.price ?? ""),
      category: food.category || "",
      image: food.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food item?")) {
      return;
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete food item.");
      }

      alert(data.message || "Food item deleted successfully.");
      await fetchFoods();
    } catch (err) {
      setError(err.message || "Unable to delete food item.");
    }
  };

  return (
    <div className="admin-food-page">
      <div className="admin-food-header">
        <h1>Food Management</h1>
        <p>Add, update, and manage your restaurant menu.</p>
      </div>

      {error && <div className="admin-food-error">{error}</div>}

      <form className="admin-food-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Food Item" : "Add New Food"}</h2>

        <div className="admin-food-form-grid">
          <input
            name="name"
            placeholder="Food name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category (e.g. Pizza)"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price (₹)"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            type="url"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Food description"
            value={form.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="admin-food-form-actions">
          <button type="submit">
            {editingId ? "Update Food" : "Add Food"}
          </button>

          {editingId && (
            <button type="button" className="cancel-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <section className="admin-food-list">
        <h2>All Food Items ({foods.length})</h2>

        {loading ? (
          <p>Loading food items...</p>
        ) : foods.length === 0 ? (
          <p>No food items yet. Add your first food item above.</p>
        ) : (
          <div className="admin-food-grid">
            {foods.map((food) => (
              <article className="admin-food-card" key={food._id}>
                {food.image ? (
                  <img
                    src={food.image}
                    alt={food.name}
                    className="admin-food-image"
                  />
                ) : (
                  <div className="admin-food-image-placeholder">
                    No image
                  </div>
                )}

                <div className="admin-food-card-content">
                  <h3>{food.name}</h3>
                  <p className="admin-food-category">{food.category}</p>
                  <p>{food.description || "No description available."}</p>
                  <strong>₹{Number(food.price).toFixed(2)}</strong>
                  <p>
                    Status: {food.isAvailable ? "Available" : "Unavailable"}
                  </p>

                  <div className="admin-food-card-actions">
                    <button type="button" onClick={() => handleEdit(food)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(food._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminFood;
