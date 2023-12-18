// models/ticket.js

const mongoose = require('mongoose');
const Flight = require('../models/Flight');
const Ticket = require('../models/ticket');
const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    required: true,
    match: /[A-F][1-9]\d?/,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
function newTicket(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if (err || !flight) {
      // Handle error or flight not found
      return res.status(404).render('error', { message: 'Flight not found' });
    }

    // Render the new ticket form with flight details
    res.render('tickets/new', { flight });
  });
}

// ... other actions

module.exports = {
  Ticket,
  new: newTicket,
};
