//DOM elements
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
var scoreBoard = document.querySelector("#scoreBoard");
var clearScores = document.querySelector(".clearButton");
var restartQuiz = document.querySelector(".restartButton");
var answerResponseCorrect = document.querySelector(".answerResponseCorrect");
var answerResponseWrong = document.querySelector(".answerResponseWrong");
var underAnswerLine = document.querySelector(".underAnswerLine");


//Hiding buttons
answerList.style.visibility = "hidden";
answer1.style.visibility = "hidden";
answer2.style.visibility = "hidden";
answer3.style.visibility = "hidden";
answer4.style.visibility = "hidden";
questions.style.visibility = "hidden";
clearScores.style.visibility = "hidden";
restartQuiz.style.visibility = "hidden";
answerResponseCorrect.style.display = "none";
answerResponseWrong.style.display = "none";
underAnswerLine.style.display = "none";


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

//Quiz formatting and timer
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
        underAnswerLine.style.display = "block";
        mainEl.textContent = "";
        headEl.textContent = "";
        jumbo.style.paddingTop = "5px";
        quizTimer--;
        timerDisplay.textContent = ("Time: " + quizTimer);
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

    //checks if clicked answer is correct
    function answerCheck(answer, i) {
        if (answerResponseWrong.style.display === "block") {
            answerResponseWrong.style.display = "none";
        }
        if (answerResponseCorrect.style.display === "block") {
            answerResponseCorrect.style.display = "none";
        }
        if (answer.textContent === questionArray[i].correct) {
            playerScore = playerScore + 3;
            i++;
            answerResponseCorrect.style.display = "block";
            questionMaker(i);
        } else {
            i++;
            answerResponseWrong.style.display = "block";
            questionMaker(i);
        }
    }

    //event listener for answers
    answer1.addEventListener("click", function() {
        answerCheck(answer1, i)
    });
    answer2.addEventListener("click", function() {
       answerCheck(answer2, i)
    });
    answer3.addEventListener("click", function() {
       answerCheck(answer3, i)
    });
    answer4.addEventListener("click", function() {
        answerCheck(answer4, i)
    });
}

//finalPage
function finalPage(finalScore) {
    
    //general formatting
    answerList.remove();
    questions.remove();
    timerDisplay.remove();
    underAnswerLine.remove();
    if (answerResponseWrong.style.display === "block") {
        answerResponseWrong.style.display = "none";
    }
    if (answerResponseCorrect.style.display === "block") {
        answerResponseCorrect.style.display = "none";
    }
    scoreBoard.textContent = "High Scores:";
    scoreBoard.style.fontSize = "20px";
    finalPage.called = true;
    headEl.style.visibility = "visible";
    headEl.textContent = "Nice Work!";

    //Setting to local storage
    var name = prompt("Nice work! Please enter your name to record your score.");
    addToStorage(name, finalScore);
    return;
}

//adds to storage then generates scoreboard
function addToStorage(name, finalScore) {
    var localScore = JSON.parse(localStorage.getItem("allScores"));
    if (localScore === null) {
        localStorage.setItem("allScores", JSON.stringify([{key: name, score: finalScore}]))
    }
    else {
        localScore.push({key: name, score: finalScore});
        localStorage.setItem("allScores", JSON.stringify(localScore));
    }
    generateScoreboard();
}

//generate scoreboard function
function generateScoreboard() {
    var localScore = [];
    localScore = JSON.parse(localStorage.getItem("allScores"));
    for (let i = 0; i < localScore.length; i++) {
        var li = document.createElement("li");
        li.textContent = ("User " + localScore[i].key + " with " + localScore[i].score + " points");
        li.setAttribute("data-index", i);
        li.classList.add("list-group-item");
        li.classList.add("list-group-item-action");
        scoreBoard.appendChild(li);
    }

    //clear highscores button
    clearScores.style.visibility = "visible";
    clearScores.textContent = "Clear Highscores";
    clearScores.addEventListener("click", function() {
        localStorage.clear();
        scoreBoard.remove();
        clearScores.remove();
    });

    //restart quiz button
    restartQuiz.style.visibility = "visible";
    restartQuiz.textContent = "Restart Quiz";
    restartQuiz.addEventListener("click", function() {
        window.location.reload(false);
    });

}

start.addEventListener("click", firstTimer);