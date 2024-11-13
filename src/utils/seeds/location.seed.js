const mongoose = require("mongoose");
require("dotenv").config();
const Location = require("../../api/models/Location");
const locations = require("../../data/locations");

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    let allLocations = await Location.find();

    if (allLocations.length) {
      await Location.collection.drop();
    }
  })
  .catch((error) => console.log(error))
  .then(async () => {
    await Location.insertMany(locations);
    console.log("Locations added");
  })
  .catch((error) => console.log(error))
  .finally(() => mongoose.disconnect());
