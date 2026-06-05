const navActionBtn =
document.getElementById(
    "navActionBtn"
);

const token =
localStorage.getItem(
    "token"
);

// NAVBAR BUTTON

if(navActionBtn){

    if(token){

        navActionBtn.textContent =
        "Logout";

        navActionBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "token"
                );

                window.location.href =
                "login.html";
            }
        );

    }else{

        navActionBtn.textContent =
        "Get Started";

        navActionBtn.addEventListener(
            "click",
            () => {

                window.location.href =
                "login.html";
            }
        );

    }

}

// ABOUT PAGE CTA BUTTON

const ctaBtn =
document.getElementById(
    "ctaBtn"
);

if(ctaBtn){

    if(token){

        ctaBtn.textContent =
        "Go To Dashboard";

        ctaBtn.onclick = () => {

            window.location.href =
            "dashboard.html";

        };

    }else{

        ctaBtn.textContent =
        "Get Started";

        ctaBtn.onclick = () => {

            window.location.href =
            "login.html";

        };

    }

}