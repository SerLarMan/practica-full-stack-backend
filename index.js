require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/database");
const userRoutes = require("./src/api/routes/user.routes");
const concertRoutes = require("./src/api/routes/concert.routes");
const locationRoutes = require("./src/api/routes/location.routes");

// Data base connection
connectDB();

// Server configuration
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);
app.use("/concerts", concertRoutes);
app.use("/locations", locationRoutes);

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
