const {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/schedule");

const { isAuth } = require("../../middleware/auth");

const scheduleRouter = require("express").Router();

scheduleRouter.get("/", getSchedules);
scheduleRouter.post("/", addSchedule);
scheduleRouter.put("/:id", updateSchedule);
scheduleRouter.delete("/:id", deleteSchedule);

module.exports = scheduleRouter;
