const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  accommodationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: true,
  },
  noOfGuests: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("booking", bookingSchema);
