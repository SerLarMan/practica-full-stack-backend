const Location = require("../models/Location");

const getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();
    return res.status(200).json(locations);
  } catch (error) {
    next(error);
  }
};

const addLocation = async (req, res, next) => {
  try {
    const newLocation = new Location(req.body);

    const locationDB = await newLocation.save();
    return res.status(201).json(locationDB);
  } catch (error) {
    next(error);
  }
};

const updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newLocation = new Location(req.body);
    newLocation._id = id;

    const updatedLocation = await Location.findByIdAndUpdate(id, newLocation, {
      new: true,
    });
    return res.status(200).json(updatedLocation);
  } catch (error) {
    next(error);
  }
};

const deleteLocation = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Location.findByIdAndDelete(id);
    return res.status(200).json("Ubicación eliminada");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLocations,
  addLocation,
  updateLocation,
  deleteLocation,
};
