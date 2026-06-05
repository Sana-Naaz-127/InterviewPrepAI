const container =
document.getElementById(
    "historyContainer"
);

const authToken =
localStorage.getItem("token");

async function loadHistory() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/interview/my",
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        const data =
        await response.json();

        const interviews =
        data.interviews || [];

        // Only completed interviews

        const completedInterviews =
        interviews.filter(
            interview => interview.completed
        );

        // Analytics

        document.getElementById(
            "totalInterviews"
        ).textContent =
        completedInterviews.length;

        let totalScore = 0;
        let highestScore = 0;

        completedInterviews.forEach(
            interview => {

            totalScore +=
            interview.overallScore || 0;

            highestScore =
            Math.max(
                highestScore,
                interview.overallScore || 0
            );
        });

        const averageScore =
        completedInterviews.length
        ? Math.round(
            totalScore /
            completedInterviews.length
        )
        : 0;

        document.getElementById(
            "averageScore"
        ).textContent =
        averageScore;

        document.getElementById(
            "highestScore"
        ).textContent =
        highestScore;

        const latestInterview =
        completedInterviews[
            completedInterviews.length - 1
        ];

        document.getElementById(
            "latestScore"
        ).textContent =
        latestInterview
        ? latestInterview.overallScore
        : 0;

        // History Cards

        container.innerHTML = "";

        completedInterviews
        .reverse()
        .forEach(interview => {

            let badgeClass =
            "poor";

            let badgeText =
            "Needs Work";

            if (
                interview.overallScore >= 80
            ) {
                badgeClass =
                "excellent";

                badgeText =
                "Excellent";
            }
            else if (
                interview.overallScore >= 60
            ) {
                badgeClass =
                "good";

                badgeText =
                "Good";
            }

            const card =
            document.createElement(
                "div"
            );

            card.classList.add(
                "card"
            );

            card.innerHTML = `
                <div class="role">
                    ${interview.targetRole}
                </div>

                <p>
                    <strong>Difficulty:</strong>
                    ${interview.difficulty}
                </p>

                <p class="score">
                    <strong>Score:</strong>
                    ${interview.overallScore}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${
                        interview.completedAt
                        ? new Date(
                            interview.completedAt
                          ).toLocaleDateString()
                        : "Not Completed"
                    }
                </p>

                    <div class="card-footer">

                    <div class="
                        badge
                        ${badgeClass}
                    ">
                        ${badgeText}
                    </div>

                    <button
                    onclick='viewFeedback(
                    ${JSON.stringify(
                        interview.evaluationFeedback
                    )}
                    )'>
                        View Feedback
                    </button>

                </div>
            `;

            container.appendChild(
                card
            );
        });

    }
    catch (error) {

        console.error(
            "History Error:",
            error
        );

    }
}

function viewFeedback(
    feedback
) {

    localStorage.setItem(
        "feedback",
        feedback
    );

    window.location.href =
    "feedback.html";
}

loadHistory();