// routes/flights.js

const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights');

router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.post('/', flightsCtrl.create);


router.get('/:id', flightsController.show);

router.post('/:id/add-destination', flightsController.addDestination);


module.exports = router;
