const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    date: { type: Date, trim: true, required: true },
    concert: { type: mongoose.Types.ObjectId, ref: "Concert", required: true },
    location: {
      type: mongoose.Types.ObjectId,
      ref: "Location",
      required: true,
    },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
