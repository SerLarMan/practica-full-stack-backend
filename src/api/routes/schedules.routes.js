const {
  getSchedules,
  getScheduleByConcertId,
  addSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/schedule");

const { isAuth } = require("../../middleware/auth");

const scheduleRouter = require("express").Router();

scheduleRouter.get("/", getSchedules);
scheduleRouter.get("/:concertId", getScheduleByConcertId);
scheduleRouter.post("/", isAuth, addSchedule);
scheduleRouter.put("/:id", isAuth, updateSchedule);
scheduleRouter.delete("/:id", isAuth, deleteSchedule);

module.exports = scheduleRouter;
