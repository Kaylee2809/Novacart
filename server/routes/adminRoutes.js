const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");

// GET ALL PRODUCTS
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// DELETE PRODUCT
router.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// GET ALL ORDERS
router.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

router.put("/orders/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(order);
});

router.delete("/orders/:id", async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
});

module.exports = router;