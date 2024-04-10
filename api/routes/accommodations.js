const express = require("express");
const Accommodation = require("../model/Accommodation");
const handleGetAccommodation = require("../controller/getAccommodationController");
const router = express.Router();

router.route("/").get(async (req, res) => {
  const allAccommodations = await Accommodation.find();
  res.json(allAccommodations);
});

router.route("/:id").get(handleGetAccommodation);
module.exports = router;
