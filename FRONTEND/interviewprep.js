window.addEventListener("DOMContentLoaded", () => {

  const startBtn =
    document.getElementById("startInterviewBtn");

  startBtn.addEventListener("click", async () => {

    console.log("Button clicked");

    const interviewData = {

      interviewType:
        document.getElementById("interviewType").value,

      difficulty:
        document.getElementById("difficulty").value,

      targetRole:
        document.getElementById("targetRole").value,

      duration:
        document.getElementById("duration").value,

      skills:
        document.getElementById("skills").value,

      jobDescription:
        document.getElementById("jobDescription").value

    };

    console.log(interviewData);

    try {

      const token = localStorage.getItem("token");

      console.log("TOKEN:", token);

      const response = await fetch(
        "http://localhost:5000/api/interview/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },

          body: JSON.stringify({

            interviewType:
              interviewData.interviewType,

            targetRole:
              interviewData.targetRole,

            difficulty:
              interviewData.difficulty,

            interviewDuration:
              interviewData.duration,

            skills:
              interviewData.skills
                .split(",")
                .map(skill => skill.trim()),

            jobDescription:
              interviewData.jobDescription,

            resume: ""

          })
        }
      );

      const data = await response.json();

      console.log(data);

      if(response.ok){

        localStorage.setItem(
          "interviewData",
          JSON.stringify(interviewData)
        );

        alert("Interview Created Successfully");

        window.location.href =
          "interview-session.html";

      } else {

        alert(data.message || "Error creating interview");

      }

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    }

  });

});