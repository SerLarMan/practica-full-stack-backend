const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema(
  {
    artist: { type: String, trim: true, required: true },
    title: { type: String, trim: true, required: true },
    schedule: [{ type: mongoose.Types.ObjectId, ref: "Schedule" }],
    description: { type: String, trim: true, required: true },
    attendees: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Concert = mongoose.model("Concert", concertSchema);
module.exports = Concert;
