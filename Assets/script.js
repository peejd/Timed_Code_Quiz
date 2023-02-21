// Global variables
var timerCount = document.querySelector('#timer-count');
var quizHeader = document.querySelector('#quiz-header');
var startButton = document.querySelector('#start-button');
var questionText = document.querySelector('#question');
var choicesContainer = document.querySelector('#choices');
var correct = document.querySelector('#answerCorrect');
var incorrect = document.querySelector('#answerIncorrect');
var questionArea = document.querySelector('#question-area');
var buttonGroup = document.querySelector('#choices');
var GameOver = document.querySelector('#end-game');
var validateAnswer = document.querySelector('#answer-validate');
var scoreEl = document.querySelector('#score');
var timer = document.querySelector('#timer');
var btnHighScores = document.querySelector('#btnHighScores');
var btnSaveScores = document.querySelector('#save-score-btn');
var endGameForm = document.querySelector('#user-initials');
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var hsArea = document.querySelector('#hs-container');
var hsList = document.querySelector('#hs-list');
var btnTakeQuiz = document.querySelector('#take-quiz');
var maxHighScores = 3
let timeLeft = 0;
let currentQuestion = 0;
let score = 0

//  Set Question and Answer content here
const questions = [
    {
      question: "What operator checks both value and data type equivalency in JavaScript?",
      choices: ["==", "=", "===", "!="],
      correctAnswer: "==="
    },
    {
      question: "What is the name for the true/false data type?",
      choices: ["integer", "string", "boolean"],
      correctAnswer: "boolean"
    },
    {
      question: "What JavaScript method is used to format data for browser localStorage?",
      choices: ["JSON.stringify()", "appendChild()", "textContent()"],
      correctAnswer: "JSON.stringify()"
    },
    {
      question: "What syntax is used to hide an element using Javascript?",
      choices: ["[element].display.none", "[element].style.display='none'", "[element].hide"],
      correctAnswer: "[element].style.display='none'"
    },
    {
      question: "What JavaScript method is necessarily used for a timer?",
      choices: ["stringify", "appendChild", "setInterval"],
      correctAnswer: "setInterval"
    }
  ];

  // Display Question and Answer Choices
  function showQuestion() {
    timer.style.display = "block";
    startButton.remove();
    let currentQ = questions[currentQuestion];
    questionText.textContent = currentQ.question;
    choicesContainer.innerHTML = "";
    for (let i = 0; i < currentQ.choices.length; i++) {
      let choice = currentQ.choices[i];
      let button = document.createElement("button");
      button.textContent = choice;
      button.classList.add("choice");
      choicesContainer.appendChild(button);
      button.addEventListener("click", checkAnswer);
    }
  }

  // Check Answer for correctness and alert user 
  function checkAnswer(event) {
    if (event.target.textContent === questions[currentQuestion].correctAnswer) {
      incorrect.textContent = "";
      correct.textContent = "Correct!";
      score++;
    } else {
      correct.textContent = "";
      incorrect.textContent = "Incorrect!";

      // Subract 5 seconds from clock for incorrect answer
      if (timeLeft >= 8) {
      timeLeft -= 5;
      }
    }
  
    // Move to Next Question
      currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }

// End of Quiz function to display results and display option to Save Score
function endQuiz () {
  timer.remove();
  questionArea.remove();
  buttonGroup.remove();
  validateAnswer.remove();
  GameOver.style.display = "flex"
  scoreEl.textContent = score;
  console.log(score);
}
  
// Event listener on Start button to begin showing questions and start the timer
startButton.addEventListener('click',
function() {
    showQuestion();
    timeLeft = (questions.length * 8);
    var timeInterval = setInterval(
    function() {
        if (timeLeft > 0) {
            timerCount.textContent = timeLeft;
            timeLeft--;
        } else {
            timerCount.textContent = timeLeft;
            clearInterval(timeInterval);
            endQuiz();
        };
    }, 1000)
});

// Event Listener and function for Save Score & Try Again button
endGameForm.addEventListener('submit',
function writeScore(event) {
  event.preventDefault();
  var userInit = document.getElementById("initials").value;
  var userScore = document.getElementById('score').innerText;
  const score = {
    init : userInit,
    score: userScore
  };
  highScores.push(score);
  highScores.sort( (a,b) => b.score - a.score);
  highScores.splice(3);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  location.reload();
});

// Event listener and function for View High Scores button
btnHighScores.addEventListener('click',
function(event) {
  timer.remove();
  startButton.remove();
  questionArea.remove();
  buttonGroup.remove();
  validateAnswer.remove();
  GameOver.style.display = "none";
  hsArea.style.display = "flex";

  hsList.innerHTML = 
    highScores
      .map(score => {
      return '<li class="high-score">' + score.init + ' - ' + score.score + '</li>';
      })
      .join("");
});

// Event Listener and page reload for Take Quiz button on High Scores screen
btnTakeQuiz.addEventListener('click',
function (event) {
  location.reload();
}
)