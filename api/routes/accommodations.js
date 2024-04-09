const express = require('express');
const Accommodation = require('../model/Accommodation');
const router = express.Router();

router.route("/")
      .get(async (req,res) => {
        const allAccommodations = await Accommodation.find();
        res.json(allAccommodations);
      })

module.exports = router;