const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    director: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    duration: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
