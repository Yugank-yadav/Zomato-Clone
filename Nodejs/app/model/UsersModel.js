const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String },
  lastname: { type: String },
});

const UsersModel = mongoose.model("user", UsersSchema);

module.exports = UsersModel;
