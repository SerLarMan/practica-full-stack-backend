const Schedule = require("../models/Schedule");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const getTicketsUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tickets = await Ticket.find({ user: id }).populate({
      path: "schedule",
      populate: ["concert", "location"],
    });
    return res.status(200).json(tickets);
  } catch (error) {
    next(error);
  }
};

const buyTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const schedule = await Schedule.findById(req.body._id);
    schedule.availableCapacity -= 1;
    await schedule.save();

    const ticket = new Ticket({
      schedule: req.body,
      user: user,
    });

    await ticket.save();
    return res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

const markTicketUsed = async (req, res, next) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status: "used" },
      { new: true }
    );

    return res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTicketsUser,
  buyTicket,
  markTicketUsed,
};
