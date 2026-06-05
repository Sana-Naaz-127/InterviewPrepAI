const express = require("express");

const router = express.Router();

const {
  createInterview,
  getMyInterviews,
  getInterviewById,
  evaluateInterview,
} = require("../controllers/interviewController");

const protect = require("../middleware/authMiddleware");


// CREATE INTERVIEW
router.post("/create", protect, createInterview);

router.post("/evaluate", protect, evaluateInterview);


// GET USER INTERVIEWS
router.get("/my", protect, getMyInterviews);
router.get("/:id", protect, getInterviewById);


module.exports = router;