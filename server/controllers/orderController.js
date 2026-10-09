const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      items,
      paymentMethod,
    } = req.body;

    if (
      !customerName?.trim() ||
      !phone ||
      !/^\d{10}$/.test(phone) ||
      !address?.trim() ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Please provide valid delivery details and cart items.",
      });
    }

    const validItems = items.every(
      (item) =>
        item.id != null &&
        typeof item.name === "string" &&
        item.name.trim() &&
        Number.isFinite(Number(item.price)) &&
        Number(item.price) >= 0 &&
        Number.isInteger(Number(item.quantity)) &&
        Number(item.quantity) >= 1
    );

    if (!validItems) {
      return res.status(400).json({
        message: "One or more cart items are invalid.",
      });
    }

    const allowedPaymentMethods = [
      "Cash on Delivery",
      "UPI",
      "Credit / Debit Card",
    ];

    if (
      paymentMethod &&
      !allowedPaymentMethods.includes(paymentMethod)
    ) {
      return res.status(400).json({
        message: "Invalid payment method.",
      });
    }

    const safeItems = items.map((item) => ({
      foodId: String(item.id),
      name: item.name.trim(),
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));

    const totalAmount = safeItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.userId,
      customerName: customerName.trim(),
      phone,
      address: address.trim(),
      items: safeItems,
      totalAmount,
      paymentMethod: paymentMethod || "Cash on Delivery",
    });

    return res.status(201).json({
      message: "Order placed successfully!",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error.message);

    return res.status(500).json({
      message: "Unable to place order. Please try again.",
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error.message);

    res.status(500).json({
      message: "Unable to fetch your orders.",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};