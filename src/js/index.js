import "../css/index.css";

const startButton = document.getElementById("start-button");
const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");
const warning1 = document.getElementById("warning-player1")
const warning2 = document.getElementById("warning-player2")

let player1 = ""
let player2 = ""


function validateInput(input, warning) {
  const value = input.value.trim();

  if (value.length < 3 || value.length > 8) {
    warning.style.display = "inline";
    return false;
  } else {
    warning.style.display = "none";
    return true;
  }
}

startButton.addEventListener("click", () => {
  let valid = true;

  if (!validateInput(player1Input, warning1)) valid = false;
  if (!validateInput(player2Input, warning2)) valid = false;

  if(valid) {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2)

    window.location.href = "/question";
  }
});

player1Input.addEventListener("blur", () => validateInput(player1Input, warning1));
player2Input.addEventListener("blur", () => validateInput(player2Input, warning2));