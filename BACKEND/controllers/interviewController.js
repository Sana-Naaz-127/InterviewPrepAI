const Interview = require("../models/Interview");

const {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
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
      skills || [],
      interviewDuration
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
// GET INTERVIEW BY ID
const getInterviewById = async (req, res) => {
  try {

    const interview = await Interview.findById(
      req.params.id
    );

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.status(200).json({
      success: true,
      interview,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const evaluateInterview = async (req, res) => {
  try {

    console.log("REQUEST BODY:", req.body);

    const {
      interviewId,
      questions,
      answers
    } = req.body;

    console.log("Interview ID:", interviewId);

    const feedback = await evaluateInterviewAnswers(
      questions,
      answers
    );

    console.log("Feedback:", feedback);

    const overallScoreMatch =
      feedback.match(/OVERALL_SCORE:\s*(\d+)/);

    const overallScore =
      overallScoreMatch
        ? parseInt(overallScoreMatch[1])
        : 0;

    const updatedInterview =
      await Interview.findByIdAndUpdate(
        interviewId,
        {
          evaluationFeedback: feedback,
          overallScore,
          completed: true,
          completedAt: new Date(),
        },
        { new: true }
      );

    console.log("UPDATED INTERVIEW:");
    console.log(updatedInterview);

    res.status(200).json({
      success: true,
      feedback,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createInterview,
  getMyInterviews,
  getInterviewById,
  evaluateInterview,
};