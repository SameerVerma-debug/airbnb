const jwt = require('jsonwebtoken');
const User = require('../model/User');
require('dotenv').config();

const handleProfile = async (req,res) => {
  const userId = req.body.userId;
  const {name,email,_id} = await User.findById(userId);
  
  res.status(200).json({name,email,id:_id});
}

module.exports = handleProfile;