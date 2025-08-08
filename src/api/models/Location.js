const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
    capacity: { type: Number, trim: true, required: true },
    contact: {
      phone: { type: String, trim: true },
      email: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.model("Location", locationSchema);
module.exports = Location;
