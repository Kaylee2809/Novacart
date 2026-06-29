const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    id: String,
    name: String,
    email: String
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],

  total: Number,

  status: {
    type: String,
    default: "Pending"
  }
},
{
  timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);