require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/database");
const cloudinary = require("cloudinary").v2;
const userRoutes = require("./src/api/routes/user.routes");
const concertRoutes = require("./src/api/routes/concert.routes");
const locationRoutes = require("./src/api/routes/location.routes");
const scheduleRoutes = require("./src/api/routes/schedules.routes");
const ticketRoutes = require("./src/api/routes/ticket.routes");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  api_key: process.env.CLOUDINARY_API_KEY,
});

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
app.use("/schedules", scheduleRoutes);
app.use("/tickets", ticketRoutes);

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
