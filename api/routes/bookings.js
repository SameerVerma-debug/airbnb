const express = require('express');
const handleBookingAccommodation = require('../controller/bookingAccommodationController');
const router = express.Router();

router.route("/") 
      .post(handleBookingAccommodation);

module.exports = router;