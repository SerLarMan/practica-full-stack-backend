const mongoose = require("mongoose");

const placeTimeSchema = new mongoose.Schema(
  {
    location: [{ type: mongoose.Types.ObjectId, ref: "Location" }],
    date: { type: Date, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const PlaceTime = mongoose.model("PlaceTime", placeTimeSchema);
module.exports = PlaceTime;
