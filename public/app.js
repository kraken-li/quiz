// Daftar pertanyaan dan logika quiz
const questions = [
  { 
    question: "What is the capital of France?", 
    options: ["London", "Paris", "Berlin", "Madrid"], 
    answer: "Paris" 
  },
  { 
    question: "Who developed the theory of relativity?", 
    options: ["Newton", "Einstein", "Tesla", "Galileo"], 
    answer: "Einstein" 
  },
  { 
    question: "What is the largest planet in our solar system?", 
    options: ["Earth", "Mars", "Jupiter", "Venus"], 
    answer: "Jupiter" 
  }
];

const questionElement = document.getElementById("question");
const optionsElement  = document.getElementById("options");
const nextButton      = document.getElementById("next");
const scoreElement    = document.getElementById("score");
const timerElement    = document.getElementById("time");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startTimer() {
  timeLeft = 10;
  timerElement.innerText = timeLeft;
  timer = setInterval(function() {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timer);
  startTimer();
  const q = questions[currentQuestionIndex];
  questionElement.innerText = q.question;
  optionsElement.innerHTML = "";
  q.options.forEach(function(option) {
    var button = document.createElement("button");
    button.innerText = option;
    button.onclick = function() {
      checkAnswer(option, q.answer);
    };
    optionsElement.appendChild(button);
  });
  nextButton.style.display = "none";
}

function checkAnswer(selected, correct) {
  clearInterval(timer);
  if (selected === correct) {
    score++;
    scoreElement.innerText = "Score: " + score;
  }
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    questionElement.innerText = "Quiz Over! Your Final Score: " + score;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    return;
  }
  loadQuestion();
}

nextButton.onclick = nextQuestion;
loadQuestion();

// Fitur share sesuai dengan panduan MiniApps
var shareButton = document.getElementById("share");
if (shareButton) {
  shareButton.addEventListener("click", function () {
    if (window.FarcasterMiniApps && typeof window.FarcasterMiniApps.share === "function") {
      window.FarcasterMiniApps.share({
        title: "General Knowledge Quiz MiniApp",
        text: "Check out this interactive quiz on Farcaster!",
        url: "https://quizzz-gules.vercel.app"
      })
      .then(function () {
        console.log("Shared successfully");
      })
      .catch(function (error) {
        console.error("Sharing failed:", error);
      });
    } else {
      alert("Sharing is not supported on this platform.");
    }
  });
}

// Inisialisasi SDK dan sembunyikan splash screen saat MiniApp sudah siap
if (window.FarcasterMiniApps && typeof window.FarcasterMiniApps.init === "function") {
  window.FarcasterMiniApps.init({
    onLoaded: function() {
      console.log("MiniApp loaded successfully");
      var loading = document.getElementById("fc-loading");
      if (loading) {
        loading.style.display = "none";
      }
    }
  });
} else {
  // Jika SDK tidak mendukung callback onLoaded, gunakan fallback
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
      var loading = document.getElementById("fc-loading");
      if (loading) {
        loading.style.display = "none";
      }
    }, 1000);
  });
}
