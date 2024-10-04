const {
  getMovies,
  getMovieByName,
  getMovieByGenre,
  addMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");

const { isAuth } = require("../../middleware/auth");

const movieRouter = require("express").Router();

movieRouter.get("/", isAuth, getMovies);
movieRouter.get("/name/:name", isAuth, getMovieByName);
movieRouter.get("/genre/:genre", isAuth, getMovieByGenre);
movieRouter.post("/", isAuth, addMovie);
movieRouter.put("/:id", isAuth, updateMovie);
movieRouter.delete("/:id", isAuth, deleteMovie);

module.exports = movieRouter;
