const Accommodation = require("../model/Accommodation");

const handleGetAccommodation = async(req,res) => {
  const {id} = req.params;
  if(!id){
    return res.sendStatus(401);
  }

  const foundAccommodation = await Accommodation.findById(id);
  res.json(foundAccommodation);
}

module.exports = handleGetAccommodation;