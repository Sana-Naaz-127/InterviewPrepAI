const dashboardToken = localStorage.getItem("token");

if(!dashboardToken){

    window.location.href = "login.html";

}


// FETCH USER DATA

async function getUserData(){

    try {

        const response = await fetch(
            "http://localhost:5000/api/auth/me",
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${dashboardToken}`
                }
            }
        );

        const user = await response.json();

        console.log(user);
        console.log("USER DATA:", user);

        document.getElementById("welcomeMessage").innerText =
            `Welcome Back, ${user.name} 👋`;

        document.getElementById("profileName").innerText =
            user.name;

    } catch(error){

        console.log(error);

    }

}



async function loadDashboardAnalytics() {

    try {

        const response =
        await fetch(
            "http://localhost:5000/api/interview/my",
            {
                headers: {
                    Authorization: `Bearer ${dashboardToken}`
                }
            }
        );

        const data =
        await response.json();

        const interviews =
        data.interviews || [];

        const completedInterviews =
        interviews.filter(
            interview => interview.completed
        );

        const scores =
        completedInterviews.map(
            interview => interview.overallScore || 0
        );

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

            }
        );

        const averageScore =
        completedInterviews.length
        ? Math.round(
            totalScore /
            completedInterviews.length
        )
        : 0;

        const latestInterview =
        completedInterviews[
            completedInterviews.length - 1
        ];

        // Stats Cards

        document.getElementById(
            "totalInterviews"
        ).textContent =
        completedInterviews.length;

        document.getElementById(
            "averageScore"
        ).textContent =
        averageScore;

        document.getElementById(
            "highestScore"
        ).textContent =
        highestScore;

        document.getElementById(
            "latestScore"
        ).textContent =
        latestInterview
        ? latestInterview.overallScore
        : 0;

        // Profile Card

        document.getElementById(
            "profileInterviews"
        ).textContent =
        completedInterviews.length;

        document.getElementById(
            "profileAverage"
        ).textContent =
        averageScore;

        document.getElementById(
            "profileHighest"
        ).textContent =
        highestScore;

        // SCORE TREND CHART

const ctx =
document.getElementById("scoreTrendChart");

new Chart(ctx, {

    type: "line",

    data: {

        labels:
        scores.map(
            (_, index) =>
            `Interview ${index + 1}`
        ),

        datasets: [{

            label: "Score",

            data: scores,

            borderColor: "#0A3323",
            backgroundColor: "#0A3323",

            fill: false,

            pointRadius: 6,

            pointHoverRadius: 8,

            tension: 0.4

        }]
    },
options: {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {
        legend: {
            display: false
        }
    },

    scales: {

        y: {

            beginAtZero: true,

            min: 0,

            max: 100,

            ticks: {
                stepSize: 20
            }

        }

    }

}

});

    }
    catch(error){

        console.log(
            "Dashboard Analytics Error:",
            error
        );

    }
}

getUserData();
loadDashboardAnalytics();

// LOGOUT

function logout(){

    localStorage.removeItem("token");

    window.location.href = "login.html";
}