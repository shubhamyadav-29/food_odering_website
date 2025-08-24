import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Place a new order
router.post("/", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const order = new Order({ userId, items, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

// Get user’s orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

export default router;
