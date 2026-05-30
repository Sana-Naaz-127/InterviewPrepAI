const loginForm = document.getElementById("loginForm");

const messageBox = document.getElementById("messageBox");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    try {

        const response = await fetch("http://localhost:5000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                password
            })

        });

        const data = await response.json();

        if(response.ok){

            localStorage.setItem("token", data.token);

            messageBox.style.color = "green";

            messageBox.innerText = "Login successful! Redirecting...";

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1500);

        } else {

            messageBox.style.color = "red";

            messageBox.innerText = data.message;

        }

    } catch(error){

        console.log(error);

        messageBox.style.color = "red";

        messageBox.innerText = "Something went wrong";

    }

});