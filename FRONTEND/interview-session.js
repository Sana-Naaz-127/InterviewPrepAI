const interviewId =
  localStorage.getItem("interviewId");

  const interviewData = JSON.parse(
  localStorage.getItem("interviewData")
);

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

function displayQuestion() {

  document.getElementById("questionText").innerText =
    questions[currentQuestionIndex].question;

  document.getElementById("questionCounter").innerText =
    `Question ${currentQuestionIndex + 1}/${questions.length}`;
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

      document.getElementById("answerInput").value = "";

    } else {

      alert("Interview completed!");

      console.log("Final Answers:");
      console.log(answers);
    }

  });

  document
  .getElementById("endInterviewBtn")
  .addEventListener("click", async () => {
    console.log("END INTERVIEW BUTTON CLICKED");

    try {

      // Save current answer before ending

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

      alert(JSON.stringify(data));

      console.log("Feedback being saved:");
      console.log(data.feedback);

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

  });