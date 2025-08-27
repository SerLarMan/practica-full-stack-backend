const {
  getConcerts,
  getConcertByNameOrArtist,
  getConcertById,
  addConcert,
  updateConcert,
  deleteConcert,
} = require("../controllers/concert");

const { isAuth } = require("../../middleware/auth");
const { upload } = require("../../middleware/file");

const concertRouter = require("express").Router();

concertRouter.get("/", getConcerts);
concertRouter.get("/search/:query", getConcertByNameOrArtist);
concertRouter.get("/:id", getConcertById);
concertRouter.post("/", isAuth, upload.single("image"), addConcert);
concertRouter.put("/:id", isAuth, upload.single("image"), updateConcert);
concertRouter.delete("/:id", isAuth, deleteConcert);

module.exports = concertRouter;
