const jwt = require('jsonwebtoken');
const Accommodation = require("../model/Accommodation");
require('dotenv').config();

const handleGetAccommodations = async (req,res) => {
  const {token} = req.cookies;
  let userId;
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {},
    async (err,decoded) => {
      if(err){
        return res.sendStatus(403).json(null);
      }
      userId = decoded.id;
      const userAccommodations = await Accommodation.find({owner:userId});
      return res.status(200).json(userAccommodations);
    }
  );
}

module.exports = handleGetAccommodations;