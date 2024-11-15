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
    await mongoose.connect(process.env.DB_URL);
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

    // Insertar schedules con referencias a locations
    const schedulesWithLocation = schedules.map((schedule) => ({
      location: locationMap.get(schedule.locationName),
      date: new Date(schedule.date),
    }));
    const insertedSchedules = await Schedule.insertMany(schedulesWithLocation);
    console.log("Schedules added:", insertedSchedules);

    // Crear un mapa compuesto para identificar schedules por fecha y location
    const scheduleMap = new Map(
      insertedSchedules.map((schedule) => [
        `${schedule.date.toISOString().split("T")[0]}_${schedule.location}`,
        schedule._id,
      ])
    );

    // Insertar concerts con referencias a schedules
    const concertsWithSchedules = concerts.map((concert) => ({
      ...concert,
      schedule: concert.scheduleDetails
        .map((detail) =>
          scheduleMap.get(
            `${detail.date}_${locationMap.get(detail.locationName)}`
          )
        )
        .filter(Boolean), // Ignorar detalles no válidos
    }));
    const insertedConcerts = await Concert.insertMany(concertsWithSchedules);
    console.log("Concerts added:", insertedConcerts);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    mongoose.disconnect();
    console.log("Database connection closed");
  }
};

seedDatabase();
