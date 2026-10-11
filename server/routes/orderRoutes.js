const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Logged-in users can place orders
router.post("/", protect, createOrder);

// Logged-in users can view their own orders
router.get("/my-orders", protect, getMyOrders);

// Only admins can view all orders
router.get("/", protect, adminOnly, getAllOrders);

// Only admins can update order status
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;