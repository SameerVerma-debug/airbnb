const express = require('express');
const handleBookingAccommodation = require('../controller/bookingAccommodationController');
const handleGetUserBookings = require('../controller/getUserBookings');
const router = express.Router();

router.route("/") 
      .post(handleBookingAccommodation)
      .get(handleGetUserBookings)
module.exports = router;