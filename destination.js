// destination.js

const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'], // Add your choices here
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
});

module.exports = destinationSchema;
