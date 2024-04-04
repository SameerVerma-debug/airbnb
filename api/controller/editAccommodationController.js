const Accommodation = require("../model/Accommodation");

const handleEditAccommodation = async(req,res) => {
  const {id} = req.params;
  if(!id){
    return res.sendStatus(401);
  }

  const foundAccommodation = await Accommodation.findOne({_id:id}).exec();
  console.log(foundAccommodation);
  res.json(foundAccommodation);
}

module.exports = handleEditAccommodation;