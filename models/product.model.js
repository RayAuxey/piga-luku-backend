const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  features: [String],
  type: String,
  imageUrl: String,
  brand: String
});

module.exports = mongoose.model("Product", ProductSchema);
