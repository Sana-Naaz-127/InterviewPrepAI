const feedback =
localStorage.getItem("evaluationFeedback");

if (!feedback) {
  alert("No feedback found");
}

const overall =
feedback.match(/OVERALL_SCORE:\s*(\d+)/);

const communication =
feedback.match(/COMMUNICATION_SCORE:\s*(\d+)/);

const technical =
feedback.match(/TECHNICAL_SCORE:\s*(\d+)/);

const confidence =
feedback.match(/CONFIDENCE_SCORE:\s*(\d+)/);

document.getElementById("overallScore").innerText =
overall ? overall[1] + "/100" : "--";

const overallValue =
overall ? parseInt(overall[1]) : 0;

const badge =
document.getElementById("performanceBadge");

if(overallValue >= 90){
    badge.innerText =
    "🏆 Excellent Performance";
}
else if(overallValue >= 75){
    badge.innerText =
    "🌟 Good Performance";
}
else if(overallValue >= 60){
    badge.innerText =
    "👍 Average Performance";
}
else{
    badge.innerText =
    "📚 Needs Improvement";
}

document.getElementById("communicationScore").innerText =
communication ? communication[1] + "/10" : "--";

document.getElementById("technicalScore").innerText =
technical ? technical[1] + "/10" : "--";

document.getElementById("confidenceScore").innerText =
confidence ? confidence[1] + "/10" : "--";

const strengthsMatch =
feedback.match(
/STRENGTHS:([\s\S]*?)IMPROVEMENTS:/
);

const improvementsMatch =
feedback.match(
/IMPROVEMENTS:([\s\S]*?)SUMMARY:/
);

const summaryMatch =
feedback.match(
/SUMMARY:([\s\S]*)/
);

if(strengthsMatch){
  const strengths =
  strengthsMatch[1]
  .split("\n")
  .filter(line => line.trim().startsWith("-"));

  strengths.forEach(item=>{
    const li =
    document.createElement("li");

    li.innerText =
    item.replace("-", "").trim();

    document
      .getElementById("strengthsList")
      .appendChild(li);
  });
}

if(improvementsMatch){
  const improvements =
  improvementsMatch[1]
  .split("\n")
  .filter(line => line.trim().startsWith("-"));

  improvements.forEach(item=>{
    const li =
    document.createElement("li");

    li.innerText =
    item.replace("-", "").trim();

    document
      .getElementById("improvementsList")
      .appendChild(li);
  });
}

if(summaryMatch){
  document.getElementById(
    "summaryText"
  ).innerText =
  summaryMatch[1].trim();
}