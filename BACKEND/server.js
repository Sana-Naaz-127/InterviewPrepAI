const express = require("express");
const cors = require("cors");

require("dotenv").config();

console.log("SERVER KEY EXISTS:", !!process.env.GEMINI_API_KEY);
console.log("SERVER KEY PREFIX:", process.env.GEMINI_API_KEY?.slice(0, 6));

// DEBUG LINE
console.log("Gemini Key:", process.env.GEMINI_API_KEY);

const connectDB = require("./config/db");

const app = express();

// ROUTES
const authRoutes = require("./routes/authRoutes");
const interviewRoutes = require("./routes/interviewRoutes");

// GEMINI TEMPORARILY DISABLED
// const geminiRoutes = require("./routes/geminiRoutes");

// DATABASE CONNECTION
connectDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES MIDDLEWARE
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

// GEMINI TEMPORARILY DISABLED
// app.use("/api/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.send("Interview Prep AI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});