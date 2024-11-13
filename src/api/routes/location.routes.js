const {
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/location");

const { isAuth } = require("../../middleware/auth");

const locationRouter = require("express").Router();

locationRouter.get("/", isAuth, getLocations);
locationRouter.post("/", isAuth, addLocation);
locationRouter.put("/:id", isAuth, updateLocation);
locationRouter.delete("/:id", isAuth, deleteLocation);

module.exports = locationRouter;
