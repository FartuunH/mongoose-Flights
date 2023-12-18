// controllers/flights.js

const Flight = require('../models/Flight');
const Ticket = require('../models/ticket');


function index(req, res) {
  // Fetch all flights and render the index view
  Flight.find({}, (err, flights) => {
    // Implement logic for displaying flights in ascending order
    // Set the `departsStyle` property for styling in the view
    res.render('flights/index', { flights, departsStyle: 'your styling logic here' });
  });
}

function newFlight(req, res) {
  // Create an in-memory flight with the default departure date
  const newFlight = new Flight();
  const dt = newFlight.departs;
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  res.render('flights/new', { departsDate });
}

function create(req, res) {
  // Handle new flight form submission
  // Add logic to create a new flight based on form data
}

function show(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    if (err) {
      console.error('Error finding flight:', err);
      res.redirect('/flights');
    } else {
            // Sort destinations by arrival date/time in ascending order

      flight.destinations.sort((a, b) => a.arrival - b.arrival);


      res.render('flights/show', { flight });
    }
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function(err, flight) {
    if (err || !flight) {
      // Handle error or flight not found
      return res.status(404).render('error', { message: 'Flight not found' });
    }

    // Find tickets associated with the flight
    Ticket.find({ flight: flight._id }, function(err, tickets) {
      if (err) {
        // Handle error
        console.error(err);
        return res.status(500).render('error', { message: 'Internal Server Error' });
      }

      // Render the show view with flight and tickets data
      res.render('flights/show', { flight, tickets });
    });
  });
}

function addDestination(req, res) {
  Flight.findById(req.params.id, (err, flight) => {
    if (err) {
      console.error('Error finding flight:', err);
      res.redirect('/flights');
    } else {
      const newDestination = {
        airport: req.body.airport,
        arrival: new Date(req.body.arrival),
      };

      flight.destinations.push(newDestination);
      
      flight.save((saveErr) => {
        if (saveErr) {
          console.error('Error saving flight with new destination:', saveErr);
        }
        res.redirect(`/flights/${flight._id}`);
      });
    }
  });
}

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  addDestination,
};
