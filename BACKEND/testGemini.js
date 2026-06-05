require("dotenv").config();

const {
  generateInterviewQuestions,
} = require("./services/geminiServices");

async function runTest() {
  try {
    const response = await generateInterviewQuestions(
      "Frontend Developer",
      "Technical",
      "Medium",
      ["HTML", "CSS", "JavaScript", "React"]
    );

    console.log("\n===== INTERVIEW QUESTIONS =====\n");
    console.log(response);
    console.log("\n==============================\n");
  } catch (error) {
    console.error("Gemini Error:", error);
  }
}

runTest();