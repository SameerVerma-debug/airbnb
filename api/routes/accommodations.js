const express = require("express");
const handleAddAccommodation = require("../controller/addAccommodationController");
const handleGetAccommodations = require("../controller/getAccommodationsController");
const handleGetAccommodation = require("../controller/getAccommodationController");
const handleEditAccommodation = require("../controller/editAccommodationController");
const router = express.Router();

router
  .route("/")
  .get(handleGetAccommodations)
  .post(handleAddAccommodation)
  .put(handleEditAccommodation);

router.route("/:id").get(handleGetAccommodation);
module.exports = router;
