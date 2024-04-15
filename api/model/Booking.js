const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
  },
  accommodation: {
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
