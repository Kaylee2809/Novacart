const mongoose = require("mongoose");
require("dotenv").config();

const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

// ADMIN SEED
const seedAdmin = async () => {
  await User.deleteMany();

  const hashed = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@store.com",
    password: hashed,
    isAdmin: true
  });

  console.log("Admin Created");
};

// PRODUCT SEED
const seedProducts = async () => {
  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "Gaming Laptop",
      price: 25000,
      description: "High performance laptop",
      image: "https://via.placeholder.com/300",
      stock: 5
    },
    {
      name: "Headphones",
      price: 1500,
      description: "Noise cancelling headphones",
      image: "https://via.placeholder.com/300",
      stock: 10
    }
  ]);

  console.log("Products Created");
};

// RUN BOTH
const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await seedAdmin();
    await seedProducts();

    console.log("✅ Seeding Completed");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

runSeed();