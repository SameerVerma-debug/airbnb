const Accommodation = require("../model/Accommodation");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleEditAccommodation = async (req, res) => {
  const {
    userId,
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    guestsInfo,
  } = req.body;

  const foundAccommodation = await Accommodation.findById(id);
  if (userId !== foundAccommodation.owner.toString()) {
    return res.sendStatus(403);
  }

  foundAccommodation.set({
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    guestsInfo,
  });
  await foundAccommodation.save();
  res.status(200).json({ message: "Accommodation Edit Successful" });
};

module.exports = handleEditAccommodation;
