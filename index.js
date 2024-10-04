require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/database");
const userRoutes = require("./src/api/routes/user.routes");
const movieRoutes = require("./src/api/routes/movie.routes");

// Data base connection
connectDB();

// Server configuration
const PORT = 3000;
const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  return res
    .status(error.status || 500)
    .json(error.messaje || "Unexpected error");
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});