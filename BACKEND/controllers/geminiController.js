const { generateContent } = require("../services/geminiServices");

const testGemini = async (req, res) => {
  try {

   res.json({
    success: true,
    envExists: !!process.env.GEMINI_API_KEY,
    keyPrefix: process.env.GEMINI_API_KEY?.substring(0, 5),
   });
    return;
    res.status(200).json({
      success: true,
      response,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  testGemini,
};