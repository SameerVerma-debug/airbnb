const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req,res,next) => {
  const {token} = req.cookies;
  if(!token){
    return res.json(null);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {},
    (err,decoded) => {
      if(err){
        return res.sendStatus(403);
      }
      req.body.userId = decoded.id;
      next();
    }
  )
}

module.exports = verifyJWT;