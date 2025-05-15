// Import global styles
import './style.css';

// Import Farcaster SDK from npm
(async () => {
  const module = await import('@farcaster/frame-sdk');
  window.FarcasterMiniApps = module.sdk;
})();


// Import quiz logic from app.js
import './app.js';

// Function to initialize the app
export function initQuiz() {
  console.log("Quiz initialized and SDK loaded.");
};

console.log("Main.js is loaded!");
export function initApp() {
  console.log("App initialized!");
}


// Ensure the script runs properly
initQuiz();