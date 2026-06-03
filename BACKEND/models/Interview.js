const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  interviewType: {
    type: String,
    required: true,
  },

  targetRole: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },

  interviewDuration: {
    type: String,
    required: true,
  },

  skills: {
    type: [String],
    default: [],
  },

  resume: {
    type: String,
    default: "",
  },

  jobDescription: {
    type: String,
    required: true,
  },

  questions: [
    {
      question: String,
      answer: String,
      feedback: String,
      score: Number,
    },
  ],

    evaluationFeedback: {
    type: String,
    default: "",
  },

  overallScore: {
    type: Number,
    default: 0,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  completedAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Interview", interviewSchema);