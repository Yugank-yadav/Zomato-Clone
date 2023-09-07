let mealTypeModel = require("../model/MealTypeModel");
let mealType = require("../resources/mealtype.json");
let MealTypeController = {
  apiHome: function (req, res) {
    res.status(200).send({
      status: true,
    });
  },

  getMealTypes: async function (req, res) {
    try {
      let result = await mealTypeModel.find();
      res.status(200).send({
        status: true,
        meal_type: result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addMealType: async function (req, res) {
    try {
      let result = await mealTypeModel.insertMany(mealType);
      res.status(200).send({
        status: true,
        message: "meal type added successfully",
        result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = MealTypeController;
