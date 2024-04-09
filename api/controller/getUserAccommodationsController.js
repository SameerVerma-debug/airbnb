const jwt = require('jsonwebtoken');
const Accommodation = require("../model/Accommodation");
require('dotenv').config();

const handleGetUserAccommodations = async (req,res) => {
  userId = req.body.userId;
  const userAccommodations = await Accommodation.find({owner:userId});
  return res.status(200).json(userAccommodations);
}

module.exports = handleGetUserAccommodations;