const Concert = require("../models/Concert");

const getConcerts = async (req, res, next) => {
  try {
    const concerts = await Concert.find();
    return res.status(200).json(concerts);
  } catch (error) {
    next(error);
  }
};

const getConcertById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const concert = await Concert.findById(id);
    return res.status(200).json(concert);
  } catch (error) {
    next(error);
  }
};

const addConcert = async (req, res, next) => {
  try {
    const newConcert = new Concert(req.body);

    const concertDB = await newConcert.save();
    return res.status(201).json(concertDB);
  } catch (error) {
    next(error);
  }
};

const updateConcert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const newConcert = new Concert(req.body);
    newConcert._id = id;
    const updatedConcert = await Concert.findByIdAndUpdate(id, newConcert, {
      new: true,
    });
    return res.status(200).json(updatedConcert);
  } catch (error) {
    next(error);
  }
};

const deleteConcert = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Concert.findByIdAndDelete(id);
    return res.status(200).json("Concert deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getConcerts,
  getConcertById,
  addConcert,
  updateConcert,
  deleteConcert,
};
