const Interview = require("../models/Interview");

const {
  generateInterviewQuestions,
} = require("../services/geminiServices");


// CREATE INTERVIEW
const createInterview = async (req, res) => {
  console.log("CREATE INTERVIEW CONTROLLER HIT");
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

    const generatedQuestionsText =
    await generateInterviewQuestions(
      targetRole,
      interviewType,
      difficulty,
      skills || []
    );

  console.log("Generated Questions:");
  console.log(generatedQuestionsText);
  const generatedQuestions = generatedQuestionsText
  .split("\n")
  .filter(q => q.trim() !== "")
  .map(q => ({
    question: q.trim(),
    answer: "",
    feedback: "",
    score: 0,
  }));

  console.log(generatedQuestions);

    const interview = await Interview.create({
      user: req.user.id,

      interviewType,
      targetRole,
      difficulty,
      interviewDuration,

      skills: skills || [],

      jobDescription,

      resume: resume || "",

      questions: generatedQuestions,
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