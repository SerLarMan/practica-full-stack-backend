const {
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/location");

const { isAuth } = require("../../middleware/auth");

const locationRouter = require("express").Router();

locationRouter.get("/", getLocations);
locationRouter.post("/", addLocation);
locationRouter.put("/:id", updateLocation);
locationRouter.delete("/:id", deleteLocation);

module.exports = locationRouter;
