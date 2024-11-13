const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    placetime: [{ type: mongoose.Types.ObjectId, ref: "PlaceTime" }],
    description: { type: String, trim: true, required: true },
    attendees: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Concert = mongoose.model("Concert", concertSchema);
module.exports = Concert;
