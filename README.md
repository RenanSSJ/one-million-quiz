<h1 align="center">1 Million Quiz - Interactive Two-Player Quiz Game</h1>

<p align="center">
  <img width="999" height="724" alt="Demo screenshot" src="https://github.com/user-attachments/assets/e159db15-c280-4b77-a13d-c46359bfccf5" />
</p>

## 💻 The Project

This project is an interactive two-player quiz game designed to be played on a single computer, simulating a TV-style question-and-answer show with a “buzzer” system.

## 🎮 How to Play

The game is divided into three phases:

### 1. Reading Phase
- The question appears on the screen.
- The timer remains paused at 10 seconds.

### 2. Buzzer Phase
- The first player to press their respective buzzer gains control.
- A speech bubble displays: **"[Player Name] answers!"** to show who hit the buzzer first.
- The 10-second countdown is activated.

### 3. Answer Phase
- The selected player must choose an answer before the timer reaches 0 seconds.

## 🎛 Controls

| Action       | Player 1 (Mouse)       | Player 2 (Keyboard) |
| ------------ | ---------------------- | ------------------- |
| **Buzzer**   | Right Mouse Button     | Spacebar            |
| **Option A** | Left-click on Option A | Key **1**           |
| **Option B** | Left-click on Option B | Key **2**           |
| **Option C** | Left-click on Option C | Key **3**           |
| **Option D** | Left-click on Option D | Key **4**           |

> Notes:
> - Player 1: right click to get control, left click to select an answer.  
> - Player 2: press Space to get control, then press 1/2/3/4 to select an answer.

## 🚀 Technologies

This project was developed using the following technologies:

- HTML5 & CSS3  
- JavaScript  
- JSON  
- Git & GitHub  
- Figma  
- Trello (task management)

## ✨ Features

- **Dual-Player System:** Two players compete using the same keyboard and mouse.  
- **Player 1 (Mouse):** Right mouse button = buzzer, left mouse button = select answer.  
- **Player 2 (Keyboard):** Spacebar = buzzer, keys 1–4 = select answer.  
- **Dynamic Timer:** The 10-second countdown only starts after the first player hits the buzzer.  
- **Urgency Warning:** A **“HURRY UP!”** message appears when the remaining time reaches 5 seconds.  
- **Visual Feedback:** Dynamic feedback screens (Correct / Incorrect / Time’s Up) with custom images and player names.  
- **Simple Scoring:** +1 point for correct answers, -1 point for wrong answers or when time runs out.  
- **Configurable Questions:** Questions are loaded from an external JSON file.

## ⚙️ Local Execution

To run this project locally, you must start a web server (browser security prevents fetching JSON files directly from the file system).

### 1. Clone the repository

```bash
git clone https://github.com/RenanSSJ/one-million-quiz
cd one-million-quiz
