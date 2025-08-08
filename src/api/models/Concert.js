const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema(
  {
    artist: { type: String, trim: true, required: true },
    title: { type: String, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    genre: { type: String, trim: true},
  },
  {
    timestamps: true,
  }
);

const Concert = mongoose.model("Concert", concertSchema);
module.exports = Concert;
