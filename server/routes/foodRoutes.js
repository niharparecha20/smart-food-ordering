const express = require("express");

const {
  getFoods,
  createFood,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public: customers can view food items
router.get("/", getFoods);

// Admin only: add a food item
router.post("/", protect, adminOnly, createFood);

// Admin only: edit a food item
router.put("/:id", protect, adminOnly, updateFood);

// Admin only: delete a food item
router.delete("/:id", protect, adminOnly, deleteFood);

module.exports = router;