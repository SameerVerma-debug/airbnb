const jwt = require('jsonwebtoken');
const User = require('../model/User');
require('dotenv').config();

const handleProfile = (req,res) => {
  const {token} = req.cookies;
  if(token){
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      {},
      async (err,decoded) => {
        if(err){
          res.status(403);
        }
        const userId = decoded.id;
        const {name,email,_id} = await User.findById(userId);
       
        res.status(200).json({name,email,id:_id});
      }
    )
  }
  else{
    res.json(null);
  }
}

module.exports = handleProfile;