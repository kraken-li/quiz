// Pastikan DOM sudah siap
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk menyembunyikan splash screen dan menampilkan quiz
  function hideSplashScreen() {
    const loading = document.getElementById("fc-loading");
    const quizContainer = document.querySelector(".quiz-container");
    if (loading) {
      loading.style.display = "none";
      console.log("Splash screen disembunyikan.");
    }
    // Tampilkan konten quiz
    if (quizContainer) {
      quizContainer.style.display = "block";
    }
  }

  // Panggil hideSplashScreen sebagai fallback setelah 3 detik
  setTimeout(hideSplashScreen, 3000);

  // Data pertanyaan untuk quiz
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

  // Ambil elemen DOM
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next");
  const scoreElement = document.getElementById("score");
  const timerElement = document.getElementById("time");
  const shareButton = document.getElementById("share");

  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 10;
  let timer;

  // Mulai hitung mundur untuk setiap pertanyaan
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

  // Memuat dan menampilkan pertanyaan
  function loadQuestion() {
    clearInterval(timer);
    startTimer();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = "";

    // Buat tombol untuk setiap opsi jawaban
    currentQuestion.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerText = option;
      btn.onclick = () => {
        // Cek apakah jawaban yang dipilih benar
        if (option === currentQuestion.answer) {
          score++;
          scoreElement.innerText = "Score: " + score;
        }
        // Tampilkan tombol Next setelah memilih jawaban
        nextButton.style.display = "block";
        clearInterval(timer);
      };
      optionsElement.appendChild(btn);
    });

    // Sembunyikan tombol Next sampai jawaban dipilih
    nextButton.style.display = "none";
  }

  // Fungsi untuk pindah ke pertanyaan berikutnya atau menampilkan hasil akhir quiz
  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      // Quiz selesai, tampilkan skor akhir
      questionElement.innerText = "Quiz Over! Final Score: " + score;
      optionsElement.innerHTML = "";
      nextButton.style.display = "none";
      clearInterval(timer);

      // Tampilkan tombol share
      shareButton.style.display = "block";
    }
  }

  // Event listener untuk tombol Next
  nextButton.addEventListener("click", nextQuestion);

  // Event listener untuk tombol Share
  shareButton.addEventListener("click", function () {
    if (
      window.FarcasterMiniApps &&
      typeof window.FarcasterMiniApps.share === "function"
    ) {
      window.FarcasterMiniApps.share({
        title: "General Knowledge Quiz MiniApp",
        text: "Check out this interactive quiz on Farcaster!",
        url: "https://quizz-cyan-two.vercel.app"
      })
        .then(() => console.log("Shared successfully"))
        .catch(error => console.error("Sharing failed:", error));
    } else {
      alert("Sharing is not supported on this platform.");
    }
  });

  // Mulai quiz dengan pertanyaan pertama
  loadQuestion();
});