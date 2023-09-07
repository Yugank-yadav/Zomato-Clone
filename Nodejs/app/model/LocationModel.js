const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  name: { type: String },
  city: { type: String },
  city_id: { type: Number },
  location_id: { type: Number },
  country_name: { type: String },
});

const LocationModel = mongoose.model("location", LocationSchema);

module.exports = LocationModel;
