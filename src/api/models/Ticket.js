const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    film: { type: mongoose.Types.ObjectId, ref: "Movie" }
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
