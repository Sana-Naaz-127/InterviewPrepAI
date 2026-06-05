const startInterviewBtn =
document.getElementById(
    "startInterviewBtn"
);

const uploadResumeBtn =
document.getElementById(
    "uploadResumeBtn"
);

const userToken =
localStorage.getItem(
    "token"
);

function handleAction(){

    if(userToken){

        window.location.href =
        "interviewprep.html";

    }else{

        window.location.href =
        "login.html";

    }

}

if(startInterviewBtn){

    startInterviewBtn.addEventListener(
        "click",
        handleAction
    );

}

if(uploadResumeBtn){

    uploadResumeBtn.addEventListener(
        "click",
        handleAction
    );

}