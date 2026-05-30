const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
console.log("API Key Prefix:", process.env.GEMINI_API_KEY?.slice(0, 10));
async function testGemini() {
  const model = genAI.getGenerativeModel({
  model:"gemini-2.5-flash",
});

  const result = await model.generateContent(
    "Say hello from Gemini"
  );

  return result.response.text();
}

module.exports = { testGemini };