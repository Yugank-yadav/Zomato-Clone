const express = require("express");
const router = express.Router();
const mealType = require("../controller/MealTypeController");
const location = require("../controller/LocationController");
const restaurant = require("../controller/RestaurantController");
const users = require("../controller/UsersController");
const menuItem = require("../controller/MenuItemController");
const PaymentController = require("../controller/PaymentController");

router.get("/", mealType.apiHome);
// meals
router.get("/get-meal-types", mealType.getMealTypes);
router.post("/add-meal-types", mealType.addMealType); //get post put delete

// location
router.get("/get-location", location.getLocationList);
router.get("/get-location-by-city-name", location.getLocationByCityName);
router.post("/add-location", location.addLocationList);

//restaurant
router.get("/get-restaurant", restaurant.getRestaurantList);
router.post("/add-restaurant", restaurant.addRestaurantList);
router.get("/get-restaurant-by-id/:id", restaurant.getRestaurantDetailsById);
router.get(
  "/get-restaurant-by-location-id/",
  restaurant.getRestaurantLocationId
);
router.post("/filter", restaurant.filterRestaurant);

// menu_items
router.get("/get-menu-item/:r_id", menuItem.getMenuItem);
router.post("/add-menu-item", menuItem.addMenuItem);

// users
router.post("/sign-up", users.userSignUp);
router.post("/login", users.userLogin);

//payment
router.post("/payment", PaymentController.payment);
router.post("/callback", PaymentController.callback); // react

module.exports = router;
