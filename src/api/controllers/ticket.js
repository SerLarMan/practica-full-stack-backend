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
    console.log(`body: ${JSON.stringify(req.body)}`);
    const { id } = req.params;
    console.log(`params: ${id}`);

    const user = await User.findById(id);
    console.log(`user: ${JSON.stringify(user)}`);

    const ticket = new Ticket({
      ...req.body,
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
