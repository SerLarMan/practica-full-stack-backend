const {
  getConcerts,
  getConcertById,
  addConcert,
  updateConcert,
  deleteConcert,
} = require("../controllers/concert");

const { isAuth } = require("../../middleware/auth");

const concertRouter = require("express").Router();

concertRouter.get("/", getConcerts);
concertRouter.get("/:id", getConcertById);
concertRouter.post("/", addConcert);
concertRouter.put("/:id", updateConcert);
concertRouter.delete("/:id", deleteConcert);

module.exports = concertRouter;
