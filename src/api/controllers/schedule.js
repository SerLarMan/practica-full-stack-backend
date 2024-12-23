const Schedule = require("../models/Schedule");

const getSchedules = async (req, res, next) => {
  try {
    const schedules = await Schedule.find();
    return res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
};

const addSchedule = async (req, res, next) => {
  try {
    const newSchedule = new Schedule(req.body);

    const scheduleDB = await newSchedule.save();
    return res.status(201).json(scheduleDB);
  } catch (error) {
    next(error);
  }
};

const updateSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newSchedule = new Schedule(req.body);
    newSchedule._id = id;

    const updatedSchedule = await Schedule.findByIdAndUpdate(id, newSchedule, {
      new: true,
    });
    return res.status(200).json(updatedSchedule);
  } catch (error) {
    next(error);
  }
};

const deleteSchedule = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Schedule.findByIdAndDelete(id);
    return res.status(200).json("Schedule deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSchedules,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};
