const express = require("express");

const {sendEnquiry} = require("../controllers/enquiryController");

const router = express.Router();

router.post("/enquiry", sendEnquiry);

module.exports = router;