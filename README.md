<h1 align="center"> 1 Million Quiz - Interactive Two-Player Quiz Game </h1>

<p align="center">
  <img width="999" height="724" alt="Screenshot_2" src="https://github.com/user-attachments/assets/e159db15-c280-4b77-a13d-c46359bfccf5" />
</p>

## 💻 The Poject

This project is an interactive two-player quiz game designed to be played on a single computer, simulating a TV-style question-and-answer show with a “buzzer” system.

## 🎮 How to Play

## Controls

| Action       | Player 1 (Mouse)       | Player 2 (Keyboard) |
| ------------ | ---------------------- | ------------------- |
| **Buzzer**   | Right Mouse Button     | Spacebar            |
| **Option A** | Left-click on Option A | Key **1**           |
| **Option B** | Left-click on Option B | Key **2**           |
| **Option C** | Left-click on Option C | Key **3**           |
| **Option D** | Left-click on Option D | Key **4**           |


The game is divided into three phases:

1. Reading Phase

The question appears on the screen.
The timer remains paused at 10 seconds.

2. Buzzer Phase

The first player to press their respective buzzer button gains control.

* Player 1 - mouse (right click to get control, left click to select the answer)
* Player 2 - keyboar (space to get contol, 1/2/3/4 to select the answer)

A speech bubble displays: "[Player Name] answers!" to show who clicked the buzzer first.
The 10-second countdown is activated.

3. The selected player must choose an answer before the timer reaches 0 seconds.

## 🚀 Tecnologias

This poject was developed using the following technologies:

- HTML5 e CSS3
- Java Script
- JSON
- Git e Github
- Figma
- Trello (Tasks Management)

## ✨ Features

- Dual-Player System: Allows two players to compete using the same keyboard and mouse.

- Player 1 (Mouse):
Uses the Right Mouse Button as the buzzer and the Left Mouse Button to select an answer.

- Player 2 (Keyboard):
Uses the Spacebar as the buzzer and keys 1, 2, 3, 4 to select an answer.

- Dynamic Timer:
The 10-second countdown only starts after the first player hits the buzzer.

- Urgency Warning:
A “HURRY UP!” message appears when the remaining time reaches 5 seconds.

- Visual Feedback:
Dynamic feedback screens (Correct / Incorrect / Time’s Up) with custom images and player names.

- Simple Scoring:
+1 point for correct answers, -1 point for wrong answers or when time runs out.

- Configurable Questions:
Questions are loaded from an external JSON file.

##⚙️ Local Execution

To run this project locally, you must start a web server.

1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/RenanSSJ/one-million-quiz
cd one-million-quiz
```
Starting a Live Server (VS Code)

If you use Visual Studio Code, install the Live Server extension and choose “Open with Live Server”.




