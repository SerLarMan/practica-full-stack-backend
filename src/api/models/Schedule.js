const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    location: { type: mongoose.Types.ObjectId, ref: "Location" },
    date: { type: Date, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
