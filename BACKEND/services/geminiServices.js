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
  skills,
  interviewDuration
) {
  console.log(
    "INTERVIEW DURATION RECEIVED:",
    interviewDuration
  );

  let questionCount = 5;

const duration =
String(interviewDuration);

if(duration.includes("5")){
    questionCount = 3;
}
else if(duration.includes("10")){
    questionCount = 5;
}
else if(duration.includes("15")){
    questionCount = 8;
}
else if(duration.includes("20")){
    questionCount = 10;
}
else if(duration.includes("30")){
    questionCount = 15;
}

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Act as an experienced interviewer.

Generate exactly ${questionCount} interview questions.

Role: ${targetRole}
Interview Type: ${interviewType}
Difficulty: ${difficulty}
Skills: ${skills.join(", ")}

Interview Structure:

Question 1:
Introduction / background question.

Questions 2-4:
Core fundamentals related to the role.

Questions 5-${Math.max(questionCount - 2, 5)}:
Technical and practical questions.

Final Questions:
Scenario-based or problem-solving questions.

Requirements:

- Questions should flow naturally.
- Questions should build upon previous topics.
- Avoid random unrelated questions.
- Focus on realistic interview experience.
- Questions should match the selected difficulty.

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

  const qaPairs = questions
    .map(
      (q, i) =>
        `Question ${i + 1}: ${q}

Answer ${i + 1}: ${answers[i] || "No Answer"}`
    )
    .join("\n\n");

  const prompt = `
You are a strict and realistic technical interviewer.

Evaluate the candidate based ONLY on the answers provided.
Evaluate the following interview:

${qaPairs}

IMPORTANT RULES:

- Evaluate only what the candidate actually wrote.
- Do not assume knowledge not demonstrated in the answer.
- Empty answers receive 0 credit.
- Single-word answers should score very low.
- Numeric answers such as "1", "2", "3" are invalid unless the question specifically asks for a number.
- Penalize vague answers.
- Penalize missing technical details.
- Penalize incorrect technical explanations.
- Penalize incomplete answers.
- Do not reward confidence if technical accuracy is poor.
- Be stricter for Hard and Expert interviews.

SCORING SCALE:

0-20   = Very Poor
21-40  = Poor
41-60  = Average
61-80  = Good
81-100 = Excellent

SUB-SCORE RULES:

- COMMUNICATION_SCORE must be an integer from 0 to 10.
- TECHNICAL_SCORE must be an integer from 0 to 10.
- CONFIDENCE_SCORE must be an integer from 0 to 10.

SCORING GUIDELINES:

Communication:
- Clarity of explanation
- Structure of answers
- Ability to express ideas

Technical:
- Correctness
- Depth of knowledge
- Use of technical concepts
- Problem-solving ability

Confidence:
- Decisiveness
- Completeness of responses
- Willingness to explain reasoning

OVERALL SCORE RULE:

Calculate OVERALL_SCORE using:

((COMMUNICATION_SCORE + TECHNICAL_SCORE + CONFIDENCE_SCORE) / 30) * 100

Round to the nearest whole number.

The OVERALL_SCORE must be mathematically consistent with the three sub-scores.

IMPORTANT:

COMMUNICATION_SCORE must be a single integer from 0 to 10.
TECHNICAL_SCORE must be a single integer from 0 to 10.
CONFIDENCE_SCORE must be a single integer from 0 to 10.

Examples:

COMMUNICATION_SCORE: 6
TECHNICAL_SCORE: 4
CONFIDENCE_SCORE: 7

Do NOT return percentages.
Do NOT return values above 10.
Do NOT return values like 60, 70, or 80.

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