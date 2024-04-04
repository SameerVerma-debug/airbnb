const express = require("express");
const handleAddAccommodation = require("../controller/addAccommodationController");
const handleGetAccommodations = require("../controller/getAccommodationsController");
const handleEditAccommodation = require("../controller/editAccommodationController");
const router = express.Router();

router.route("/")
      .get(handleGetAccommodations)
      .post(handleAddAccommodation)

router.route("/:id")
      .get(handleEditAccommodation)
module.exports = router;
