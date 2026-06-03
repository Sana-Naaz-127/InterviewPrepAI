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

async function evaluateInterviewAnswers(
  questions,
  answers
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash-lite",
  });

const prompt = `
You are a strict technical interviewer.

Evaluate the candidate realistically.

IMPORTANT SCORING RULES:

- Do NOT give high scores easily.
- Average intern answers should score between 50-70.
- Good answers should score between 70-85.
- Exceptional answers should score above 85.
- Never give 90+ unless the candidate demonstrates excellent technical understanding with detailed explanations.

Evaluate:

Questions:
${questions.join("\n")}

Answers:
${answers.join("\n")}

Return EXACTLY in this format:

OVERALL_SCORE: <number>

COMMUNICATION_SCORE: <number>

TECHNICAL_SCORE: <number>

CONFIDENCE_SCORE: <number>

STRENGTHS:
- point 1
- point 2
- point 3

IMPROVEMENTS:
- point 1
- point 2
- point 3

SUMMARY:
<detailed paragraph>

Be critical and realistic.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}
module.exports = {
  testGemini,
  generateInterviewQuestions,
  evaluateInterviewAnswers,
};