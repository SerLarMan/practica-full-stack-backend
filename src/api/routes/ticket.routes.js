const {
  getTickets,
  addTicket,
  deleteTicket,
} = require("../controllers/ticket");

const { isAuth } = require("../../middleware/auth");

const ticketRouter = require("express").Router();

ticketRouter.get("/", getTickets);
ticketRouter.post("/", isAuth, addTicket);
ticketRouter.delete("/:id", isAuth, deleteTicket);

module.exports = ticketRouter;
