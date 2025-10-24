import "../css/index.css";
import confetti from 'canvas-confetti';

const winnerNameEl = document.getElementById("winner-name");
const player1ScoreEl = document.getElementById("player1-score");
const player2ScoreEl = document.getElementById("player2-score");
const winnerImgEl = document.getElementById("winnerSilvio");

// get info from localstorage
const scores = JSON.parse(localStorage.getItem("scores")) || { mouse: 0, keyboard: 0 };
const player1Name = localStorage.getItem("player1") || "Jogador 1";
const player2Name = localStorage.getItem("player2") || "Jogador 2";

let winnerName = "";

// Choose winner 
if (scores.mouse > scores.keyboard) {
    winnerName = player1Name;
} else if (scores.keyboard > scores.mouse) {
    winnerName = player2Name;
} else {
    // in case of draw 
    const h1 = winnerNameEl ? winnerNameEl.parentElement : null;
    if (h1) {
        h1.textContent = "DRAW!";
        winnerImgEl.src = "images/draw.jpg"; 
    }
}

// update HTML name
if (winnerNameEl && winnerName) {
    winnerNameEl.textContent = winnerName.toUpperCase();
}
if (player1ScoreEl) {
    player1ScoreEl.textContent = `${player1Name}: ${scores.mouse} points`;
}
if (player2ScoreEl) {
    player2ScoreEl.textContent = `${player2Name}: ${scores.keyboard} points`;
}

// confetti animation
const duration = 5 * 1000; // 5 segundos
const end = Date.now() + duration;

function frame() {
  // left
  confetti({
    particleCount: 5,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 }
  });
  // right
  confetti({
    particleCount: 5,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 }
  });
  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}
frame();

//Restart game when pressing space
window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        e.preventDefault();
      //redirect to first page
        window.location.href = "/"; 
    }
});