const Ticket = require("../models/Ticket");
const User = require("../models/User")

const getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate("film");
    return res.status(200).json(tickets);
  } catch (error) {
    next(Error);
  }
};

const addTicket = async (req, res, next) => {
  try {
    const newTicket = new Ticket(req.body);
    const ticketDB = await newTicket.save();

    const user = await User.findById(req.user._id)
    user.tickets.push(ticketDB._id)
    await User.findByIdAndUpdate(user._id, user)

    return res.status(201).json(ticketDB);
  } catch (error) {
    next(Error);
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Ticket.findByIdAndDelete(id);
    return res.status(200).json("Ticket deleted");
  } catch (error) {
    next(Error);
  }
};

module.exports = { getTickets, addTicket, deleteTicket };
