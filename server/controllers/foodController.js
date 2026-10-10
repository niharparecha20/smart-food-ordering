const Food = require("../models/Food");

// Get all food items
const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });

    res.status(200).json({ foods });
  } catch (error) {
    console.error("Get foods error:", error.message);

    res.status(500).json({
      message: "Unable to fetch food items.",
    });
  }
};

// Add a food item
const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (
      !name?.trim() ||
      price === undefined ||
      price === "" ||
      !category?.trim()
    ) {
      return res.status(400).json({
        message: "Food name, price and category are required.",
      });
    }

    const parsedPrice = Number(price);

    if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({
        message: "Price must be a valid non-negative number.",
      });
    }

    const food = await Food.create({
      name: name.trim(),
      description,
      price: parsedPrice,
      category: category.trim(),
      image,
    });

    res.status(201).json({
      message: "Food item added successfully.",
      food,
    });
  } catch (error) {
    console.error("Create food error:", error.message);

    res.status(500).json({
      message: "Unable to add food item.",
    });
  }
};

// Update a food item
const updateFood = async (req, res) => {
  try {
    const { name, description, price, category, image, isAvailable } =
      req.body;

    const updates = {};

    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (category !== undefined) updates.category = category;
    if (image !== undefined) updates.image = image;
    if (isAvailable !== undefined) updates.isAvailable = isAvailable;

    if (price !== undefined) {
      const parsedPrice = Number(price);

      if (!Number.isFinite(parsedPrice) || parsedPrice < 0) {
        return res.status(400).json({
          message: "Price must be a valid non-negative number.",
        });
      }

      updates.price = parsedPrice;
    }

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food item not found.",
      });
    }

    res.status(200).json({
      message: "Food item updated successfully.",
      food,
    });
  } catch (error) {
    console.error("Update food error:", error.message);

    res.status(500).json({
      message: "Unable to update food item.",
    });
  }
};

// Delete a food item
const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food item not found.",
      });
    }

    res.status(200).json({
      message: "Food item deleted successfully.",
    });
  } catch (error) {
    console.error("Delete food error:", error.message);

    res.status(500).json({
      message: "Unable to delete food item.",
    });
  }
};

module.exports = {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
};