import express from "express";
import Food from "../models/Food.js"; // Food model
import { verifyAdmin } from "../middleware/authMiddleware.js"; // admin check

const router = express.Router();

// ✅ Add new food
router.post("/food", verifyAdmin, async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const newFood = new Food({ name, price, image });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(500).json({ message: "Error adding food", error });
  }
});

// ✅ Get all food items
router.get("/food", verifyAdmin, async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food", error });
  }
});

// ✅ Delete food
router.delete("/food/:id", verifyAdmin, async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food", error });
  }
});

export default router;
