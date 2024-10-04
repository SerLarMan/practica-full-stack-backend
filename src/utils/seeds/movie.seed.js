const mongoose = require("mongoose");
require("dotenv").config();
const Movie = require("../../api/models/Movie");
const movies = require("../../data/movies");

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    let allMovies = await Movie.find();

    if (allMovies.length) {
      await Movie.collection.drop();
    }
  })
  .catch((error) => console.log(error))
  .then(async () => {
    await Movie.insertMany(movies);
    console.log("Movies added");
  })
  .catch((error) => console.log(error))
  .finally(() => mongoose.disconnect());
