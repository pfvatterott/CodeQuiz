//DOM elements
var start = document.querySelector("#startQuiz");
var mainEl = document.querySelector(".lead");
var secondsLeft = 2;
var headEl = document.querySelector(".display-4");
var jumbo = document.querySelector(".jumbotron");
var timerDisplay = document.getElementById("topTimer");
var questions = document.querySelector(".questions");
var answerList = document.querySelector("#fullList");
var answerbox1 = document.getElementById("answer1");
var answerbox2 = document.getElementById("answer2");
var answerbox3 = document.getElementById("answer3");
var answerbox4 = document.getElementById("answer4");
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
        question: "Question 1: Where in your HTML do you link to your JavaScript file?",
        answer1: "In the head",
        answer2: "In the footer",
        answer3: "At the end of the body",
        answer4: "When you link your CSS file",
        correct: "At the end of the body"
    },
    {
        question: "Question 2: Which of the following is not a JavaScript Data Type?",
        answer1: "Undefined",
        answer2: "Number",
        answer3: "Boolean",
        answer4: "Float",
        correct: "Float"
    },
    {
        question: "Question 3: Inside which HTML element do we put the JavaScript?",
        answer1: "<script>",
        answer2: "<head>",
        answer3: "<meta>",
        answer4: "<style>",
        correct: "<script>"
    },
    {
        question: "Question 4: What are the types of pop up boxes in Javascript?",
        answer1: "Alert",
        answer2: "Prompt",
        answer3: "Confirm",
        answer4: "All of the above",
        correct: "All of the above"
    },
    {
        question: "Question 4: What are the types of pop up boxes in Javascript?",
        answer1: "asdgasdf",
        answer2: "hi there",
        answer3: "basdghaf",
        answer4: "hdsadfasdf",
        correct: "hi there"
    },
    {
        question: "Question 5: Which of the following method checks if its argument is not a number?",
        answer1: "isNaN()",
        answer2: "nonNaN()",
        answer3: "NaN()",
        answer4: "None of the above",
        correct: "isNaN()"
    },
    {
        question: "Question 6: How would you write 'hello world' inside of an alert box?",
        answer1: "msgBox('hello world')",
        answer2: "alertBox('hello world')",
        answer3: "msg('hello world')",
        answer4: "alert('hello world')",
        correct: "alert('hello world')"
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
            quiz(i);
        }
    }, 1000);
}

//Quiz formatting and timer
var quizTimer = 60;
var playerScore = 0;
var i = 0;
function quiz(i) {
    var timerInveral = setInterval(function() {
        answerbox1.style.visibility = "visible";
        answerbox2.style.visibility = "visible";
        answerbox3.style.visibility = "visible";
        answerbox4.style.visibility = "visible";
        answerList.style.visibility = "visible";
        questions.style.visibility = "visible";
        underAnswerLine.style.display = "block";
        mainEl.textContent = "";
        headEl.textContent = "";
        jumbo.style.paddingTop = "5px";
        quizTimer--;
        timerDisplay.textContent = ("Time: " + quizTimer);

        //determines when to call final page
        if (finalPage.called === true || quizTimer === 0 || finalQuestion === true) {
            var finalScore = quizTimer + playerScore;
            clearInterval(timerInveral);
            finalPage(finalScore);
            return;
        }
    }, 1000)
    questionMaker(i);
}

//generates the qustions and answers
var finalQuestion = false;
function questionMaker(i) {
    if (i === questionArray.length) {
        finalQuestion = true;
        return;
    }
    questions.textContent = questionArray[i].question;
    questions.style.fontSize = "20px";
    answerbox1.textContent = questionArray[i].answer1;
    answerbox2.textContent = questionArray[i].answer2;
    answerbox3.textContent = questionArray[i].answer3;
    answerbox4.textContent = questionArray[i].answer4;

    //event listener for answers
    answerbox1.addEventListener("click", function() {
        answerCheck(answerbox1, i);
    });
    answerbox2.addEventListener("click", function() {
        answerCheck(answerbox2, i);
    });
    answerbox3.addEventListener("click", function() {
        answerCheck(answerbox3, i);
    });
    answerbox4.addEventListener("click", function() {
        answerCheck(answerbox4, i);
    });
}

//checks if clicked answer is correct
var iterationChecker = 0;    //prevents i from iterating backwards
function answerCheck(answer, i) {
    if (iterationChecker === i) {
        if (answerResponseWrong.style.display === "block") {
            answerResponseWrong.style.display = "none";
        }
        else if (answerResponseCorrect.style.display === "block") {
            answerResponseCorrect.style.display = "none";
        };
        if (answer.textContent === questionArray[i].correct) {
            playerScore = playerScore + 3;
            i++;
            iterationChecker++;
            console.log("RIGHT " + playerScore);
            console.log("RIGHT i is " + i);
            answerResponseCorrect.style.display = "block";
            return questionMaker(i);
        }
        else {
            i++;
            iterationChecker++;
            console.log("WRONG " + playerScore);
            console.log("WRONG i is " + i);
            answerResponseWrong.style.display = "block";
            return questionMaker(i);
        };
    }
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