// import mongoose schema
const mongoose = require("mongoose");

// create schema
const MenuItemsSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { type: mongoose.Schema.Types.ObjectId },
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

// create model (collection)
const MenuItemsModel = mongoose.model("menuItem", MenuItemsSchema, "menuitems");

// export model
module.exports = MenuItemsModel;
