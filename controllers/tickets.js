// controllers/tickets.js

const Flight = require('../models/Flight');
const Ticket = require('../models/ticket');

// ... other actions

function create(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if (err || !flight) {
      // Handle error or flight not found
      return res.status(404).render('error', { message: 'Flight not found' });
    }

    // Create a new ticket
    const newTicket = new Ticket({
      seat: req.body.seat,
      price: req.body.price,
      flight: flight._id,
    });

    // Save the ticket to the database
    newTicket.save(function (err) {
      if (err) {
        // Handle error
        console.error(err);
        return res.status(500).render('error', { message: 'Internal Server Error' });
      }

      // Redirect back to the flight's show view
      res.redirect(`/flights/${flight._id}`);
    });
  });
}

module.exports = {
  create,
  // ... other actions
};
