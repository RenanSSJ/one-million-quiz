import "../css/index.css";

const QUESTIONS_URL = "/data/questionsDB.json"; 

let questions = [];
let currentQuestionNumber = 0;
let timer = null;
let timeLeft = 10;
let currentPlayer = null; // "mouse" | "keyboard"
const scores = { mouse: 0, keyboard: 0 };

// Player names
const player1Name = localStorage.getItem("player1") || "Jogador 1";
const player2Name = localStorage.getItem("player2") || "Jogador 2";

// Elements
const counterEl = document.querySelector(".counter");
const imgSilvio = document.getElementById("normalSilvio");
const speechBubble = document.getElementById("speechBubble");
const questionText = document.getElementById("question-text");
const quizContainer = document.querySelector(".quiz-container"); 
const optionsContainer = document.getElementById("options-container");
const feedbackContainer = document.getElementById("feedback-positive");
const speechBubbleText = speechBubble ? speechBubble.querySelector("p") : null;
const feedbackElements = feedbackContainer ? feedbackContainer.querySelectorAll(".feedback-container") : [];
const feedbackPositiveEl = feedbackElements.length > 0 ? feedbackElements[0] : null;
const feedbackNegativeEl = feedbackElements.length > 1 ? feedbackElements[1] : null;
const feedbackPositivePlayerName = feedbackPositiveEl ? feedbackPositiveEl.querySelector(".player-name") : null;
const feedbackNegativePlayerName = feedbackNegativeEl ? feedbackNegativeEl.querySelector(".player-name") : null;

// HELPERS URL
function getQuestionIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get("id");
    if (idParam) return parseInt(idParam, 10);

    const m = window.location.pathname.match(/question(\d+)/);
    if (m) {
        const n = parseInt(m[1], 10);
        if (!isNaN(n) && n >= 1) return n;
    }
    return 1;
}

function setURLForQuestionByIndex(index) {
    const q = questions[index];
    const id = q && typeof q.id === "number" ? q.id + 1 : index + 1;
    history.replaceState({}, "", `${window.location.pathname}?id=${id}`);
}

// Load Json + create function to load the question
async function loadQuestions() {
    try {
        const res = await fetch(QUESTIONS_URL);
        if (!res.ok) throw new Error("HTTP " + res.status);
        questions = await res.json();

        const startId = getQuestionIdFromURL(); 
        const idxById = questions.findIndex(q => Number(q.id) === startId - 1 || Number(q.id) === startId);
        currentQuestionNumber = idxById >= 0 ? idxById : Math.max(0, startId - 1);

        showQuestion();
    } catch (err) {
        console.error("Erro ao carregar questionsDB.json:", err);
        if (questionText) questionText.textContent = "Erro ao carregar perguntas.";
    }
}

// SHOW QUESTION
function showQuestion() {
  if (feedbackContainer) feedbackContainer.style.display = "none";
  if (speechBubble) speechBubble.style.display = "none";
  if (quizContainer) quizContainer.style.display = "flex";
  if (imgSilvio) imgSilvio.src = "/images/normalSilvio.png";

  clearInterval(timer);
  timeLeft = 10;
  updateCounterDisplay();

  const q = questions[currentQuestionNumber];
  if (!q) {
    endGame();
    return;
  }

  setURLForQuestionByIndex(currentQuestionNumber);
  questionText.textContent = q.question ?? q.text ?? "Pergunta sem texto";

  optionsContainer.innerHTML = "";
  const answers = q.answers ?? q.options ?? [];
  answers.forEach((ans, i) => {

    const wrapper = document.createElement("div");
    wrapper.className = "option-wrapper";

    const btn = document.createElement("button");
    btn.className = "option";
    const text = typeof ans === "string" ? ans : (ans.text ?? String(ans));
    btn.textContent = `${String.fromCharCode(65 + i)}) ${text}`; 
    btn.dataset.index = i;
    btn.addEventListener("click", () => {
      if (currentPlayer === "mouse") handleAnswer(i, "mouse");
    });

    const scoreSpan = document.createElement("span");
    scoreSpan.className = "option-score";

    wrapper.appendChild(btn);
    wrapper.appendChild(scoreSpan);

    optionsContainer.appendChild(wrapper);
  });

  currentPlayer = null;
  toggleButtons();
  startTimer();
}

// TIMER
function startTimer() {
    clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        updateCounterDisplay(); 

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (currentPlayer === "mouse") scores.mouse -= 1;
            else if (currentPlayer === "keyboard") scores.keyboard -= 1;

            showTempFeedback(false, null); 
            
            //adjust time for next question
            setTimeout(() => nextQuestion(), 1500); 
        }
    }, 1000);
}

function updateCounterDisplay() {
    if (counterEl) {
        counterEl.textContent = `${timeLeft} Seconds`;
        counterEl.style.color = timeLeft <= 5 ? "red" : "";
    }
}

// ANSWER HANDLING
function handleAnswer(selectedIndex, player) {
  clearInterval(timer);
  const q = questions[currentQuestionNumber];

  // Isso ainda pega todos os botões, está correto
  const buttons = optionsContainer.querySelectorAll(".option");
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = "default";
  });

  const currentNumber = (typeof q.correctAnswer === "number") ? q.correctAnswer
    : (typeof q.currentNumber === "number") ? q.currentNumber
    : (typeof q.correct === "number") ? q.correct
    : 0;

  const isCorrect = (selectedIndex === currentNumber);
  const selectedButton = buttons[selectedIndex]; 

  if (isCorrect) {
    // Cenário: Resposta CORRETA
    if (selectedButton) {
      selectedButton.style.backgroundColor = "var(--correct-option-color)"; 
      
      // Encontra o span de pontuação ao lado do botão
      const wrapper = selectedButton.parentElement;
      const scoreSpan = wrapper.querySelector(".option-score");
      if (scoreSpan) {
        scoreSpan.textContent = "+1";
        scoreSpan.style.color = "var(--correct-option-color)"; // Cor verde
      }
    }
  } else {
    // Cenário: Resposta INCORRETA
    if (selectedButton) {
      selectedButton.style.backgroundColor = "var(--select-wrong-color)"; 
      
      // Encontra o span de pontuação ao lado do botão
      const wrapper = selectedButton.parentElement;
      const scoreSpan = wrapper.querySelector(".option-score");
      if (scoreSpan) {
        scoreSpan.textContent = "-1";
        scoreSpan.style.color = "var(--select-wrong-color)"; // Cor vermelha
      }
    }
    // Pinta a resposta correta de amarelo
    if (buttons[currentNumber]) {
      buttons[currentNumber].style.backgroundColor = "var(--select-correct-color)"; 
    }
  }
  
  // O resto da função continua exatamente igual
  if (isCorrect) {
    if (player === "mouse") scores.mouse += 1;
    else if (player === "keyboard") scores.keyboard += 1;
  } else {
    if (player === "mouse") scores.mouse -= 1;
    else if (player === "keyboard") scores.keyboard -= 1;
  }

  let playerName = (player === "mouse") ? player1Name : player2Name;
  
  if (speechBubble) {
    let speechText = isCorrect 
    ? `CORRECT!`
   : `INCORRECT!`;

    if (speechBubbleText) {
      speechBubbleText.textContent = speechText;
    }
    speechBubble.style.display = "block";
    if (isCorrect) {
      imgSilvio.src = "/images/happySilvio.png";
    } else {
      imgSilvio.src = "/images/sadSilvio.png"; 
    }
  }

  //adjust time for feedback (normal Silvio part)
  setTimeout(() => {
    showTempFeedback(isCorrect, player);
 }, 2000); 

  // speech buble + feedback page time (will extend the miniSilvio feedback page)
  setTimeout(() => {
    nextQuestion();
  }, 5500); 
}
// FEEDBACK
function showTempFeedback(isCorrect, player) {
    if (quizContainer) quizContainer.style.display = "none"; 

    let playerName;
    
    if (player === "mouse") playerName = player1Name;
    else if (player === "keyboard") playerName = player2Name;
    else playerName = "Both Players"; 

    if (feedbackContainer) {
        if (isCorrect) {
            if (feedbackPositivePlayerName) feedbackPositivePlayerName.textContent = playerName;
            if (feedbackPositiveEl) feedbackPositiveEl.style.display = "flex";
            if (feedbackNegativeEl) feedbackNegativeEl.style.display = "none";
        } else {
            if (player === null && feedbackNegativeEl) {
                const h2 = feedbackNegativeEl.querySelector("h2");
                if (h2) h2.textContent = "TIME IS OVER!";
            } 
            else if (feedbackNegativeEl) {
                
                const h2 = feedbackNegativeEl.querySelector("h2");
                if (h2) h2.innerHTML = `<span class="player-name">${playerName}</span> ANSWERED INCORRECTLY...`;
                
                if (feedbackNegativePlayerName) feedbackNegativePlayerName.textContent = playerName;
            }

            if (feedbackPositiveEl) feedbackPositiveEl.style.display = "none";
            if (feedbackNegativeEl) feedbackNegativeEl.style.display = "flex";
        }
        feedbackContainer.style.display = "block";
    }
}

// Next question
function nextQuestion() {
    clearInterval(timer);
    currentQuestionNumber++;

    //add delay at the end so the feedback is complete before the winners page shows up
    if (currentQuestionNumber >= questions.length) {
        setTimeout(() => endGame(), 2000); 
    } else {
        showQuestion();
    }
}

function endGame() {
  localStorage.setItem("scores", JSON.stringify(scores));
  window.location.href = "/winner";
}

// PLAYER CONTROLS
window.addEventListener("keydown", (space) => {
    if (space.code === "Space") {
        space.preventDefault();
        if (currentPlayer) return;
        currentPlayer = "keyboard";
        toggleButtons();
    }

    if (currentPlayer === "keyboard") {
        const keyMap = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3 };
        if (keyMap.hasOwnProperty(space.code)) {
            const index = keyMap[space.code];
            handleAnswer(index, "keyboard");
        }
    }
});

window.addEventListener("contextmenu", (mouse) => {
    mouse.preventDefault();
    if (currentPlayer) return;
    currentPlayer = "mouse";
    toggleButtons();
});

function toggleButtons() {
    const buttons = optionsContainer.querySelectorAll(".option");
    buttons.forEach(btn => {
        btn.disabled = currentPlayer !== "mouse";
    });
}

// at the start hide the speechbuble
if (feedbackContainer) feedbackContainer.style.display = "none";
if (speechBubble) speechBubble.style.display = "none";

loadQuestions();
