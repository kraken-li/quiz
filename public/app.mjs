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
  timer = setInterval(() => {
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
  
  // Bersihkan opsi lama dan buat opsi baru
  optionsElement.innerHTML = "";
  q.options.forEach(option => {
    const button = document.createElement("button");
    button.innerText = option;
    button.onclick = () => checkAnswer(option, q.answer);
    optionsElement.appendChild(button);
  });
  
  nextButton.style.display = "none";
}

function checkAnswer(selected, correct) {
  clearInterval(timer);
  if (selected === correct) {
    score++;
    scoreElement.innerText = `Score: ${score}`;
  }
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    questionElement.innerText = `Quiz Over! Your Final Score: ${score}`;
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    return;
  }
  loadQuestion();
}

nextButton.onclick = nextQuestion;
loadQuestion();

// Inisialisasi SDK Farcaster MiniApps sesuai panduan Publishing
if (window.FarcasterMiniApps && typeof window.FarcasterMiniApps.init === 'function') {
  window.FarcasterMiniApps.init();
}
