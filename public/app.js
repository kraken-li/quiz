// === [1] Bersihkan Data Onboarding dari localStorage ===
try {
  localStorage.removeItem("onboardingStatus");
  console.log("Removed onboardingStatus from localStorage.");
} catch (error) {
  console.error("Error clearing onboarding data:", error);
}

// === [2] Logika Quiz MiniApp ===
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

// === [3] Fitur Share MiniApp ===
const shareButton = document.getElementById("share");
if (shareButton) {
  shareButton.addEventListener("click", function () {
    if (window.FarcasterMiniApps && typeof window.FarcasterMiniApps.share === "function") {
      window.FarcasterMiniApps.share({
        title: "General Knowledge Quiz MiniApp",
        text: "Check out this interactive quiz on Farcaster!",
        url: "https://quizzz-gules.vercel.app"
      })
      .then(() => console.log("Shared successfully"))
      .catch(error => console.error("Sharing failed:", error));
    } else {
      alert("Sharing is not supported on this platform.");
    }
  });
}

// === [4] Panggil ready() (jika tersedia) ===
console.log("Mini App konten telah siap.");
if (window.FarcasterMiniApps && typeof window.FarcasterMiniApps.ready === "function") {
  window.FarcasterMiniApps.ready();
} else {
  console.warn("FarcasterMiniApps.ready belum tersedia.");
}

// === [5] Fallback: Sembunyikan Splash Screen Setelah 3 Detik ===
function hideSplashScreen() {
  const loading = document.getElementById("fc-loading");
  if (loading && loading.style.display !== "none") {
    loading.style.display = "none";
    console.log("Fallback: Splash screen disembunyikan.");
  }
}

// Bila document sudah ready, langsung atur fallback:
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(hideSplashScreen, 3000);
  });
} else {
  // Jika sudah complete, jalankan fallback langsung
  setTimeout(hideSplashScreen, 3000);
}
