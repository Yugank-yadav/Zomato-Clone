const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: { type: String },
  city: { type: String },
  location_id: { type: Number },
  city_id: { type: Number },
  locality: { type: String },
  thumb: { type: Array },
  aggregate_rating: { type: Number },
  rating_text: { type: String },
  min_price: { type: Number },
  contact_number: { type: Number },
  cuisine_id: { type: Array },
  cuisine: { type: Array },
  image: { type: String },
  mealtype_id: { type: Number },
});

const RestaurantModel = mongoose.model("restaurant", RestaurantSchema);

module.exports = RestaurantModel;
