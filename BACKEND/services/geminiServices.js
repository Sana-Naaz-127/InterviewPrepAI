const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log(
  "API Key Prefix:",
  process.env.GEMINI_API_KEY?.slice(0, 10)
);

async function testGemini() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(
    "Say hello from Gemini"
  );

  return result.response.text();
}

async function generateInterviewQuestions(
  targetRole,
  interviewType,
  difficulty,
  skills
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Generate exactly 5 interview questions.

Role: ${targetRole}
Interview Type: ${interviewType}
Difficulty: ${difficulty}
Skills: ${skills.join(", ")}

Return only the questions.
One question per line.
No numbering.
No explanations.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = {
  testGemini,
  generateInterviewQuestions,
};