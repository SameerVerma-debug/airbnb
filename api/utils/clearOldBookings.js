const Booking = require("../model/Booking");

const clearOldBookings = async() => {
  const currDate = new Date();

  const allBookings = await Booking.find();

  for(let it = 0 ; it<allBookings.length ; it++){
    const currBooking = allBookings[it];
    const checkOutDate = new Date(currBooking.checkOutDate);
    const currBookingId = currBooking._id;

    if(checkOutDate < currDate){
      await Booking.findByIdAndDelete(currBookingId);
    }
  }
}

module.exports = clearOldBookings;