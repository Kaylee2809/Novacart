const Product = require("../models/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // remove null/invalid entries just in case
    const safeProducts = products.filter(Boolean);

    res.json(safeProducts);
  } catch (err) {
    console.log("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// GET SINGLE PRODUCT
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.log("GET PRODUCT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.file ? req.file.filename : ""
});

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }


    await Product.findByIdAndDelete(id);


    res.json({
      message: "Product deleted successfully"
    });


  } catch (err) {

    console.log("DELETE ERROR:", err);

    res.status(500).json({
      message: "Delete failed"
    });

  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
};