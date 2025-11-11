import "../css/index.css";

const startButton = document.getElementById("start-button");
const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");
const warning1 = document.getElementById("warning-player1");
const warning2 = document.getElementById("warning-player2");

let player1 = "";
let player2 = "";

function showWarning(warning, text) {
  if (!warning) return;
  warning.textContent = text;
  warning.style.display = "inline";
}

function hideWarning(warning) {
  if (!warning) return;
  warning.style.display = "none";
}

function validateInput(input, warning) {
  if (!input || !warning) return false;

  const value = input.value.trim();

  if (value.length === 0) {
    showWarning(warning, "Required");
    return false;
  }

  if (value.length < 3) {
    showWarning(warning, "Name is too short!");
    return false;
  }

  if (value.length > 8) {
    showWarning(warning, "Name is too long!");
    return false;
  }

  hideWarning(warning);
  return true;
}

if (warning1) warning1.style.display = "none";
if (warning2) warning2.style.display = "none";

if (startButton) {
  startButton.addEventListener("click", () => {
    let valid = true;

    if (!validateInput(player1Input, warning1)) valid = false;
    if (!validateInput(player2Input, warning2)) valid = false;

    if (valid) {
      player1 = player1Input.value.trim();
      player2 = player2Input.value.trim();

      localStorage.setItem("player1", player1);
      localStorage.setItem("player2", player2);

      window.location.href = "./question/index.html?id=0";
    }
  });
}

if (player1Input) {
  player1Input.addEventListener("input", () => validateInput(player1Input, warning1));
  player1Input.addEventListener("blur", () => validateInput(player1Input, warning1));
}

if (player2Input) {
  player2Input.addEventListener("input", () => validateInput(player2Input, warning2));
  player2Input.addEventListener("blur", () => validateInput(player2Input, warning2));
}