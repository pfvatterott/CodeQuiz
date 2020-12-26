//Event listener for Start Quiz
var start = document.querySelector("#startQuiz");
var mainEl = document.querySelector(".lead");
var secondsLeft = 2;
var headEl = document.querySelector(".display-4");
var jumbo = document.querySelector(".jumbotron");
var timerDisplay = document.getElementById("topTimer");
var questions = document.querySelector(".questions");
var answerList = document.querySelector("#fullList");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");
var scoreBoard = document.getElementById("scoreBoard");


//Hiding buttons
answerList.style.visibility = "hidden";
answer1.style.visibility = "hidden";
answer2.style.visibility = "hidden";
answer3.style.visibility = "hidden";
answer4.style.visibility = "hidden";
questions.style.visibility = "hidden";
scoreBoard.style.visibility = "hidden";

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
var quizTimer = 10;
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
        console.log(i);
        //determines when to call final page//
        if (finalPage.called === true || quizTimer === 0 || finalQuestion === true) {
            var finalScore = quizTimer + playerScore;
            clearInterval(timerInveral);
            finalPage(finalScore);
            return;
        }
    }, 1000)
    questionMaker(i)
}

var finalQuestion = false;
function questionMaker(i) {
    if (i === questionArray.length) {
        finalQuestion = true;
        return;
    }
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

//finalPage
function finalPage(finalScore) {
    answerList.remove();
    questions.remove();
    timerDisplay.remove();
    scoreBoard.style.visibility = "visible";
    finalPage.called = true;
    headEl.style.visibility = "visible";
    headEl.textContent = "You have finished the Quiz!";

    //local storage
    var name = prompt("Nice work! Please enter your name to record your score.");
    var a = ({key: name, score: finalScore});
    localStorage.setItem("score", JSON.stringify(a));
    var localScore = JSON.parse(localStorage.getItem("score"));
    document.getElementById("score1").textContent = ("User " + localScore.key + " with " + localScore.score + " points");
    return;
}

start.addEventListener("click", firstTimer);