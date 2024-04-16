const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
  },
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  checkInDate: {
    type: String,
  },
  checkOutDate: {
    type: String,
  },
  noOfGuests: {
    type: String,
  },
});

module.exports = mongoose.model("booking", bookingSchema);
