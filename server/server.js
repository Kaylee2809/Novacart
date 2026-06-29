require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes= require("./routes/userRoutes");
const path = require("path");
connectDB();

const app =
  express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/images", express.static("public/images"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/images",express.static(path.join(__dirname, "public/images")));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

app.get("/", (req, res) => {

  res.send(
    "CodeAlpha MERN API Running"
  );

});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
