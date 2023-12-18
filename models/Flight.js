// models/Flight.js

const mongoose = require('mongoose');
const destinationSchema = require('./destination'); // Adjust the path accordingly

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United'], // Add more choices as needed
    required: true,
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], // Add more choices as needed
    default: 'DEN',
  },
  flightNo: {
    type: Number,
    required: true,
    min: 10,
    max: 9999,
  },
  departs: {
    type: Date,
    default: () => {
      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
      return oneYearFromNow;
    },
  },
  destinations: {
    type: [destinationSchema],
    required: true,
  },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
