const data = JSON.parse(
  localStorage.getItem("interviewData")
);

document.getElementById("roleText").innerText =
  `Role: ${data.targetRole}`;

document.getElementById("typeText").innerText =
  `Interview Type: ${data.interviewType}`;

document.getElementById("difficultyText").innerText =
  `Difficulty: ${data.difficulty}`;

document.getElementById("skillsText").innerText =
  `Skills: ${data.skills}`;