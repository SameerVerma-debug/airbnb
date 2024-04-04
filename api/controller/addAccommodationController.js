const Accommodation = require("../model/Accommodation");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const handleAddAccommodation = async (req, res) => {
  const {
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

  const {token} = req.cookies;
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {},
    async (err,decoded) => {
      if(err){
        return res.sendStatus(403).json(null);
      }
      const owner = decoded.id;
      await Accommodation.create({
        owner,
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
      res.sendStatus(201);
    } 
  )
}

module.exports = handleAddAccommodation;