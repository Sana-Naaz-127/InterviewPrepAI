const Interview = require("../models/Interview");


// CREATE INTERVIEW
const createInterview = async (req, res) => {
  try {

    const {
      interviewType,
      targetRole,
      difficulty,
      interviewDuration,
      skills,
      jobDescription,
      resume,
    } = req.body;

    const interview = await Interview.create({
      user: req.user.id,

      interviewType,
      targetRole,
      difficulty,
      interviewDuration,

      skills: skills || [],

      jobDescription,

      resume: resume || "",

      questions: [],
    });

    res.status(201).json({
      success: true,
      message: "Interview created successfully",
      interview,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET MY INTERVIEWS
const getMyInterviews = async (req, res) => {
  try {

    const interviews = await Interview.find({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      interviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createInterview,
  getMyInterviews,
};