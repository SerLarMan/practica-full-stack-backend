const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    adress: { type: String, trim: true, required: true },
    capacity: { type: Number, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;