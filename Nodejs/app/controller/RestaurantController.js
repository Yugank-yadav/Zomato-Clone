const RestaurantModel = require("../model/RestaurantModel");
const restaurantList = require("../resources/restaurant.json"); // only to insert
const RestaurantController = {
  getRestaurantList: async function (req, res) {
    try {
      let result = await RestaurantModel.find();
      res.status(200).send({
        status: true,
        restaurant: result,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  addRestaurantList: async function (req, res) {
    try {
      let result = await RestaurantModel.insertMany(restaurantList);
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
  getRestaurantDetailsById: async function (req, res) {
    try {
      let { id } = req.params;
      let data = await RestaurantModel.findById(id);

      res.status(200).send({
        status: true,
        result: data,
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  getRestaurantLocationId: async function (req, res) {
    const { lid, rest } = req.query;
    try {
      let data = await RestaurantModel.find(
        {
          name: { $regex: rest + ".*", $options: "i" },
          location_id: Number(lid),
        },
        {
          name: 1,
          image: 1,
          location: 1,
          locality: 1,
          city: 1,
        }
      );
      res.status(200).send({ status: true, result: data });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  filterRestaurant: async function (req, res) {
    let {
      mealtype,
      location,
      cuisine,
      lcost,
      hcost,
      page,
      sort,
      itemsPerPage,
    } = req.body;
    sort = sort ? sort : 1;
    page = page ? page : 1;
    itemsPerPage = itemsPerPage ? itemsPerPage : 2;

    let staringIndex = page * itemsPerPage - itemsPerPage; //0
    let lastIndex = page * itemsPerPage; // 2

    let filterObject = {};

    if (mealtype) filterObject["mealtype_id"] = mealtype;
    if (location) filterObject["location_id"] = location;
    if (lcost && hcost)
      filterObject["min_price"] = { $lte: hcost, $gte: lcost };

    cuisine && (filterObject["cuisine_id"] = { $in: cuisine });
    // console.log(filterObject)

    try {
      let result = await RestaurantModel.find(filterObject, {
        aggregate_rating: 1,
        city: 1,
        image: 1,
        name: 1,
        locality: 1,
        min_price: 1,
        cuisine: 1,
      }).sort({
        min_price: sort,
      });

      const filterResult = result.slice(staringIndex, lastIndex);
      res.status(200).send({
        status: true,
        result: filterResult,
        pageCount: Math.ceil(result.length / 2), //gives a round number
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

module.exports = RestaurantController;
