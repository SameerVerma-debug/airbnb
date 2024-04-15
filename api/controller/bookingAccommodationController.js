//Reject Booking for these:
//1. if older booking with checkOut > current checkIn
//2. if user already booked this before with checkOut > current checkIn

const Booking = require("../model/Booking");

const handleBookingAccommodation = async (req, res) => {
  const { checkInDate, checkOutDate, noOfGuests, userId } = req.body;
  const { accommodationId } = req.params;

  const previousBookings = await Booking.find({
    accommodation: accommodationId,
  });

  const currDate = new Date();
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  const filteredBookings = [];

  for (let it = 0; it < previousBookings.length; it++) {
    const prevBooking = previousBookings[it];
    const prevBookingCheckOut = new Date(prevBooking.checkOutDate);
    const prevBookingId = prevBooking._id;
    if (prevBookingCheckOut < currDate) {
      await Booking.findByIdAndDelete(prevBookingId);
    } else {
      filteredBookings.push(prevBooking);
    }
  }
  console.log(filteredBookings);
  for (let it = 0; it < filteredBookings.length; it++) {
    const booking = filteredBookings[it];
    const bookingCheckInDate = new Date(booking.checkInDate);
    const bookingCheckOutDate = new Date(booking.checkOutDate);

    if (
      (checkIn >= bookingCheckInDate && checkIn <= bookingCheckOutDate) ||
      (checkOut >= bookingCheckInDate && checkOut <= bookingCheckOutDate)
    ) {
      return res
        .status(406)
        .json({ message: "Accommodation Booked for current selected dates" });
    }
  }

  const newBooking = await Booking.create({
    user:userId,
    accommodation: accommodationId,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    noOfGuests,
  });
  console.log(newBooking);
};

module.exports = handleBookingAccommodation;
