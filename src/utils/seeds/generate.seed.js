const mongoose = require("mongoose");
require("dotenv").config();

// Importar modelos
const Location = require("../../api/models/Location");
const Schedule = require("../../api/models/Schedule");
const Concert = require("../../api/models/Concert");

// Datos iniciales
const locations = require("../../data/locations");
const schedules = require("../../data/schedules");
const concerts = require("../../data/concerts");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to database");

    // Limpiar colecciones
    await Location.collection
      .drop()
      .catch(() => console.log("No Location collection to drop."));
    await Schedule.collection
      .drop()
      .catch(() => console.log("No Schedule collection to drop."));
    await Concert.collection
      .drop()
      .catch(() => console.log("No Concert collection to drop."));

    // Insertar locations
    const insertedLocations = await Location.insertMany(locations);
    console.log("Locations added:", insertedLocations);

    // Crear un mapa para localizar IDs por nombre
    const locationMap = new Map(
      insertedLocations.map((loc) => [loc.name, loc._id])
    );

    //Insertar Conciertos
    const insertedConcerts = await Concert.insertMany(concerts);
    console.log("Concerts added:", insertedConcerts);

    //Crear un mapa para localizar IDs por artista
    const concertMap = new Map(
      insertedConcerts.map((concert) => [concert.artist, concert._id])
    );

    // Insertar schedules con referencias a locations y concerts
    const schedulesWithInfo = schedules.map((schedule) => ({
      date: new Date(schedule.date),
      concert: concertMap.get(schedule.concertArtist),
      location: locationMap.get(schedule.locationName),
      price: schedule.price,
    }));
    const insertedSchedules = await Schedule.insertMany(schedulesWithInfo);
    console.log("Schedules added:", insertedSchedules);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
    console.log("Database connection closed");
  }
};

seedDatabase();
