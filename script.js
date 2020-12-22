//Event listener for Start Quiz
var start = document.querySelector("#startQuiz");
var mainEl = document.querySelector(".lead");
var secondsLeft = 2;
var headEl = document.querySelector(".display-4");
var jumbo = document.querySelector(".jumbotron");
var questions = document.querySelector(".questions");
var answerList = document.querySelector("#fullList");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");


//Hiding buttons
answerList.style.visibility = "hidden";
answer1.style.visibility = "hidden";
answer2.style.visibility = "hidden";
answer3.style.visibility = "hidden";
answer4.style.visibility = "hidden";
questions.style.visibility = "hidden";

//Array of Questions and Answers
var questionArray = [
    {
        question: "Question 1: What is my name?",
        answer1: "John",
        answer2: "Paul",
        answer3: "Jacob",
        answer4: "Ball",
        correct: "Paul"
    },
    {
        question: "Question 2: What is my last name?",
        answer1: "Johnson",
        answer2: "Muller",
        answer3: "Jackson",
        answer4: "Vatterott",
        correct: "Vatterott"
    }
]

//Start Quiz Timer
function firstTimer () {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        mainEl.textContent = secondsLeft;
        mainEl.style.fontSize = "250px";
        headEl.textContent = "Starting in...";
        start.style.visibility = "hidden";

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            quiz();
        }
    }, 1000);
}

//Quiz
var quizTimer = 60;
var timerDisplay = document.getElementById("topTimer");
playerScore = 0;
function quiz() {
    var i = 0;
    var timerInveral = setInterval(function() {
        answer1.style.visibility = "visible";
        answer2.style.visibility = "visible";
        answer3.style.visibility = "visible";
        answer4.style.visibility = "visible";
        answerList.style.visibility = "visible";
        questions.style.visibility = "visible";
        mainEl.textContent = "";
        headEl.textContent = "";
        jumbo.style.paddingTop = "5px";
        quizTimer--;
        timerDisplay.textContent = quizTimer;
        if (quizTimer === 0) {
            clearInterval(timerInveral);
            scoreBoard();
        }
    }, 1000)
    questionMaker(i)
}

function questionMaker(i) {
    console.log(playerScore);
    questions.textContent = questionArray[i].question;
    questions.style.fontSize = "20px";
    answer1.textContent = questionArray[i].answer1;
    answer2.textContent = questionArray[i].answer2;
    answer3.textContent = questionArray[i].answer3;
    answer4.textContent = questionArray[i].answer4;

    answer1.addEventListener("click", function() {
        if (answer1.textContent === questionArray[i].correct) {
            playerScore = playerScore + 3;
            i++;
            questionMaker(i);
        } else {
            i++;
            questionMaker(i);
        }

    });
    answer2.addEventListener("click", function() {
        if (answer2.textContent === questionArray[i].correct) {
            playerScore = playerScore + 3;
            i++;
            questionMaker(i);
        } else {
            i++;
            questionMaker(i);
        }
    });
    answer3.addEventListener("click", function() {
        if (answer3.textContent === questionArray[i].correct) {
            playerScore = playerScore + 3;
            i++;
            questionMaker(i);
        } else {
            i++;
            questionMaker(i);
        }
    });
    answer4.addEventListener("click", function() {
        if (answer4.textContent === questionArray[i].correct) {
            playerScore = playerScore + 3;
            i++;
            questionMaker(i);
        } else {
            i++;
            questionMaker(i);
        }
    });
}

//Scoreboard
function scoreBoard() {
    mainEl.textContent = "You ran out of time!";
    mainEl.style.fontSize = "50px";
}

start.addEventListener("click", firstTimer);

