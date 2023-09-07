const LocationModel = require("../model/LocationModel");
const locationList = require("../resources/location.json"); // only to insert
const LocationController = {
  getLocationList: async function (req, res) {
    try {
      let result = await LocationModel.find();
      res.status(200).send({
        status: true,
        location: result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getLocationByCityName: async function (req, res) {
    let { city } = req.query;
    try {
      let result = await LocationModel.find({
        city: { $regex: city + ".*", $options: "i" },
      });
      res.status(200).send({
        status: true,
        location: result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addLocationList: async function (req, res) {
    try {
      let result = await LocationModel.insertMany(locationList);
      res.status(200).send({
        status: true,
        message: "added successfully",
        result: result,
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

module.exports = LocationController;
