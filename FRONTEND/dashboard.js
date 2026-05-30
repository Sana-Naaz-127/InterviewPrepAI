const token = localStorage.getItem("token");

if(!token){

    window.location.href = "login.html";

}


// FETCH USER DATA

async function getUserData(){

    try {

        const response = await fetch("http://localhost:5000/api/auth/me", {

            method: "GET",

            headers: {
                "Authorization": token
            }

        });

        const user = await response.json();

        console.log(user);

        document.getElementById("welcomeMessage").innerText =
            `Welcome Back, ${user.name} 👋`;

    } catch(error){

        console.log(error);

    }

}


getUserData();


// LOGOUT

function logout(){

    localStorage.removeItem("token");

    window.location.href = "login.html";

}