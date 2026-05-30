const express = require("express");

const router = express.Router();

const {
  createInterview,
  getMyInterviews,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");


// CREATE INTERVIEW
router.post("/create", protect, createInterview);


// GET USER INTERVIEWS
router.get("/my", protect, getMyInterviews);


module.exports = router;