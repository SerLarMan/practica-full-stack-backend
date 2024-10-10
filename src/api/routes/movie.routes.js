const {
  getMovies,
  getMovieByName,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

const { isAuth } = require("../../middleware/auth");

const movieRouter = require("express").Router();

movieRouter.get("/", getMovies);
movieRouter.get("/name/:name", getMovieByName);
movieRouter.post("/", isAuth, addMovie);
movieRouter.put("/:id", isAuth, updateMovie);
movieRouter.delete("/:id", isAuth, deleteMovie);

module.exports = movieRouter;
