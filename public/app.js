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

// === [4] Panggil ready() dari SDK ketika UI sudah siap ===
// Karena dokumentasinya menyatakan kita harus memanggil ready() sesaat setelah antarmuka Mini App siap,
// kita bungkus pemanggilan ini dalam async IIFE. Juga, kita gunakan disableNativeGestures sesuai contoh dokumentasi.

(async function callReadyWhenReady() {
  // Menunggu agar UI telah termuat tanpa jitter atau reflow.
  // Pastikan pelacakan UI di sini sudah menyatakan bahwa antarmuka Mini App siap.
  console.log("Mini App konten telah siap.");
  if (window.FarcasterMiniApps && window.FarcasterMiniApps.actions && typeof window.FarcasterMiniApps.actions.ready === "function") {
    try {
      await window.FarcasterMiniApps.actions.ready({ disableNativeGestures: true });
      console.log("SDK ready() telah dipanggil.");
    } catch (error) {
      console.error("Error saat memanggil ready():", error);
    }
  } else {
    console.warn("FarcasterMiniApps.actions.ready belum tersedia. Menggunakan fallback untuk menyembunyikan splash screen.");
    // Fallback: Sembunyikan splash screen setelah 3 detik.
    setTimeout(hideSplashScreen, 3000);
  }
})();

// === [5] Fallback: Sembunyikan Splash Screen Jika ready() Tidak Terpanggil ===
function hideSplashScreen() {
  const loading = document.getElementById("fc-loading");
  if (loading && loading.style.display !== "none") {
    loading.style.display = "none";
    console.log("Fallback: Splash screen disembunyikan.");
  }
}

// Pastikan fallback juga dijalankan apabila DOM sudah lengkap.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(hideSplashScreen, 3000);
  });
} else {
  setTimeout(hideSplashScreen, 3000);
}
