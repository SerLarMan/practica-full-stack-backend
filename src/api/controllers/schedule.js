const Schedule = require("../models/Schedule");

const getSchedules = async (req, res, next) => {
  try {
    const schedules = await Schedule.find()
      .populate("concert")
      .populate("location");
    return res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
};

const getScheduleByConcertId = async (req, res, next) => {
  try {
    const { concertId } = req.params;

    const schedules = await Schedule.find({ concert: concertId }, null, {
      sort: { date: 1 },
    })
      .populate("concert")
      .populate("location");
    return res.status(200).json(schedules);
  } catch (error) {
    next(error);
  }
};

const addSchedule = async (req, res, next) => {
  try {
    const newSchedule = new Schedule(req.body);
    newSchedule.availableCapacity = req.body.location.capacity;

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
    return res.status(200).json("Fecha eliminada");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSchedules,
  getScheduleByConcertId,
  addSchedule,
  updateSchedule,
  deleteSchedule,
};
