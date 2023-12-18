// routes/tickets.js

const express = require('express');
const router = express.Router({ mergeParams: true });
const ticketsCtrl = require('../controllers/tickets');

// ... other routes

// Display the new ticket form
router.get('/new', ticketsCtrl.new);
router.post('/', ticketsCtrl.create);
router.delete('/:ticketId', ticketsCtrl.delete);

module.exports = router;
