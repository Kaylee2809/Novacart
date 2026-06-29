const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order failed" });
  }
};

// GET ALL ORDERS (ADMIN)
exports.getOrders = async (req, res) => {

  console.log("ADMIN REACHED GET ORDERS");

  try {

    const orders = await Order.find();

    console.log(
      "ORDERS FOUND:",
      orders.length
    );

    res.json(orders);


  } catch (err) {

    console.log(err);

    res.status(500).json({
      message:"Failed to fetch orders"
    });

  }

};
    // USER SEES ONLY THEIR OWN
   exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "user.id": req.user.id
    }).sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};