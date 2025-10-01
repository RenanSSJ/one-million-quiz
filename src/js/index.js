import "../css/index.css";

// elements
const startButton = document.getElementById("start-button");
const player1Input = document.getElementById("player1-name");
const player2Input = document.getElementById("player2-name");
const warning1 = document.getElementById("warning-player1")
const warning2 = document.getElementById("warning-player2")

let player1 = ""
let player2 = ""

startButton.addEventListener("click", () => {
  let valid = true;

  if (player1Input.value.trim().length < 3 || player1Input.value.trim().length > 8){

    warning1.style.display = "inline";
    valid = false

  } else {
    warning1.style.display = "none"
  }

  if (player2Input.value.trim().length < 3 || player2Input. value.trim.length > 8) {
    warning2.style.display = "inline";
    valid = false
  } else {
    warning2.style.display = "none"
  }

})