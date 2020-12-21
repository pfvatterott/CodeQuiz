//Event listener for Start Quiz
var start = document.querySelector("#startQuiz");
var mainEl = document.querySelector(".lead");
var secondsLeft = 2;
var headEl = document.querySelector(".display-4");

//Array of Questions and Answers
var questions = [
    {
        question: "What is my name?",
        answer1: "John",
        answer2: "Paul",
        answer3: "Jacob",
        answer4: "Ball"
    },
    {
        question: "What is my last name?",
        answer1: "Johnson",
        answer2: "Muller",
        answer3: "Jackson",
        answer4: "Vatterott"
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
var quizTimer = 5;
var timerDisplay = document.getElementById("topTimer");
function quiz() {
    var timerInveral = setInterval(function() {
        quizTimer--;
        timerDisplay.textContent = quizTimer;
        if(quizTimer === 0) {
            mainEl.textContent = "You ran out of time!"
        }
    }, 1000)

}

start.addEventListener("click", firstTimer);

