const storedToken =
localStorage.getItem("token");

if (!storedToken) {

    alert("Please login first");

    window.location.href =
    "login.html";
}