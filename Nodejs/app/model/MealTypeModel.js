// import mongoose schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const mealTypeSchema = new Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  meal_type: { type: Number },
});

// create model (collection)
const mealTypeModel = mongoose.model("mealType", mealTypeSchema);

// export model
module.exports = mealTypeModel;
