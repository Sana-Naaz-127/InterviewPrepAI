require("dotenv").config();

const { testGemini } = require("./services/geminiServices");

async function runTest() {
  try {
    const response = await testGemini();

    console.log("\n===== GEMINI RESPONSE =====");
    console.log(response);
    console.log("===========================\n");
  } catch (error) {
    console.error("Gemini Error:", error);
  }
}

runTest();