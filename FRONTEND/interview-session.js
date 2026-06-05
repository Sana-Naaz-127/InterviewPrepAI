const interviewId =
  localStorage.getItem("interviewId");

  const interviewData = JSON.parse(
  localStorage.getItem("interviewData")
);


// ================= TIMER =================

const timerElement =
  document.getElementById("timer");

let durationText =
  interviewData.interviewDuration || "5 Minutes";

console.log(
  "Duration:",
  durationText
);

let totalSeconds = 300; // default 5 min

if (durationText.includes("10")) {
  totalSeconds = 600;
}
else if (durationText.includes("15")) {
  totalSeconds = 900;
}

function updateTimer() {

  const minutes =
    Math.floor(totalSeconds / 60);

  const seconds =
    totalSeconds % 60;

  timerElement.innerText =
    `Time Left: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  
    // Last 60 seconds warning
  if (totalSeconds <= 60) {
    timerElement.style.color = "#ff4d4f";
    timerElement.style.fontWeight = "bold";
  }

  totalSeconds--;

  if (totalSeconds < 0) {
    clearInterval(timerInterval);
    alert(
      "Time is up! Your interview is being submitted automatically."
    );

    endInterview();
  }
}

updateTimer();

const timerInterval =
  setInterval(updateTimer, 1000);

document.getElementById("roleText").innerText =
  `Role: ${interviewData.targetRole}`;

document.getElementById("typeText").innerText =
  `Interview Type: ${interviewData.interviewType}`;

document.getElementById("difficultyText").innerText =
  `Difficulty: ${interviewData.difficulty}`;

document.getElementById("skillsText").innerText =
  `Skills: ${interviewData.skills?.join(", ") || ""}`;

console.log("Interview Data:");
console.log(interviewData);

console.log("Questions:");
console.log(interviewData.questions);

// ---------------------------
// QUESTION NAVIGATION
// ---------------------------

let currentQuestionIndex = 0;

const questions = interviewData.questions;

let answers = [];
let interviewSubmitted = false;
async function endInterview() {

  if (interviewSubmitted) return;

  interviewSubmitted = true;

  clearInterval(timerInterval);

  console.log("ENDING INTERVIEW");

  try {

    answers[currentQuestionIndex] =
      document.getElementById("answerInput").value;

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/interview/evaluate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          interviewId,
          questions: questions.map(q => q.question),
          answers,
        }),
      }
    );

    const data = await response.json();

    console.log("Evaluation Result:");
    console.log(data);

    localStorage.setItem(
      "evaluationFeedback",
      data.feedback
    );

    window.location.href =
      "feedback.html";

  } catch (error) {

    console.error(error);

    alert("Evaluation failed");
  }
}


function displayQuestion() {
  document.getElementById("prevBtn").disabled =
  currentQuestionIndex === 0;

  document.getElementById("questionText").innerText =
    questions[currentQuestionIndex].question;

  document.getElementById("questionCounter").innerText =
    `Question ${currentQuestionIndex + 1}/${questions.length}`;

  document.getElementById("answerInput").value =
    answers[currentQuestionIndex] || "";
}

displayQuestion();

// NEXT BUTTON

document
  .getElementById("nextBtn")
  .addEventListener("click", () => {


    const currentAnswer =
      document.getElementById("answerInput").value;

    answers[currentQuestionIndex] = currentAnswer;

    console.log("Saved Answers:");
    console.log(answers);

    if (currentQuestionIndex < questions.length - 1) {

      currentQuestionIndex++;

      displayQuestion();


    } else {

  answers[currentQuestionIndex] =
    document.getElementById("answerInput").value;

  alert("Interview completed! Generating feedback...");

  endInterview();
}

  });

  document
  .getElementById("prevBtn")
  .addEventListener("click", () => {

    answers[currentQuestionIndex] =
      document.getElementById("answerInput").value;

    if (currentQuestionIndex > 0) {

      currentQuestionIndex--;

      displayQuestion();
    }

  });

  document
  .getElementById("skipBtn")
  .addEventListener("click", () => {

    answers[currentQuestionIndex] = "Skipped";

    console.log("Question Skipped");

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      displayQuestion();

    } else {

      alert(
        "All questions completed. Click End Interview to receive feedback."
      );
    }

  });

document
  .getElementById("endInterviewBtn")
  .addEventListener("click", endInterview);