import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/orders
 * @desc    Create new order
 * @access  Private
 */
router.post("/", protect, async (req, res) => {
  try {
    const { products, totalPrice } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/orders/myorders
 * @desc    Get logged-in user's orders
 * @access  Private
 */
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product", "name price image");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin)
 * @access  Private/Admin
 */
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/", protect, async (req, res) => {
  const { products, paymentMethod, totalPrice } = req.body;

  if (!products || products.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user._id,
    products,
    paymentMethod,
    totalPrice,
    isPaid: paymentMethod === "COD" ? false : true,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

/**
 * @route   PUT /api/orders/:id/pay
 * @desc    Mark order as paid
 * @access  Private
 */
router.put("/:id/pay", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isPaid = true;
    await order.save();

    res.json({ message: "Order marked as paid" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
