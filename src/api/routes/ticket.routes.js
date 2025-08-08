const {
  getTicketsUser,
  buyTicket,
  markTicketUsed,
} = require("../controllers/ticket");

const { isAuth } = require("../../middleware/auth");

const ticketRouter = require("express").Router();

ticketRouter.get("/:id", isAuth, getTicketsUser);
ticketRouter.post("/:id", isAuth, buyTicket);
ticketRouter.put("/:id/mark-used", markTicketUsed);

module.exports = ticketRouter;
