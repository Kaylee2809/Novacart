const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getUserOrders
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// CREATE ORDER (USER ONLY)
router.post("/", protect, createOrder);

// GET ALL ORDERS (ADMIN ONLY)
router.get("/", protect, adminOnly, getOrders);

// GET ONLY LOGGED-IN USER ORDERS
router.get("/my-orders", protect, getUserOrders);

module.exports = router;