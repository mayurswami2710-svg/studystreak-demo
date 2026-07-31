# ⚡ StudyStreak App

A sleek, feature-rich Pomodoro timer and task management application built with React to help students and developers maintain focus and track daily productivity streaks.

![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

* **⏱️ Custom Pomodoro Modes:** Easily toggle between **Work Sessions (25m)**, **Short Breaks (5m)**, and **Long Breaks (15m)**.
* **🔔 Smart Audio Alerts:**
  * **10-Minute Pop Interval:** Synthesizes a clean audio "pop" every 10 minutes of active focus to keep you aware of time passing.
  * **Session Completion Chime:** Plays a two-tone alarm when the countdown hits zero.
* **📋 Integrated Task Manager:** Full task management (Add, Check off, Delete) right below your study timer.
* **💾 Local Storage Persistence:** Automatically saves your tasks, current streak, and remaining time so you don't lose progress on page refresh.
* **🌐 Dynamic Browser Title:** Real-time countdown visible directly in your browser tab title (`(24:59) StudyStreak App`).
* **🔥 Habit Streak Counter:** Displays your active study streak to keep you motivated day after day.
* **🌙 Eye-Friendly Dark UI:** Modern, high-contrast dark theme designed for night-time study sessions.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (Hooks: `useState`, `useEffect`, `useRef`)
* **Audio Engine:** Web Audio API (Browser native synthesis — no external `.mp3` assets required)
* **Storage:** Web Storage API (`localStorage`)
* **Styling:** CSS-in-JS (Inline modular layout)

---

## 💻 Getting Started

To run this project locally on your system:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/mayurswami2710-svg/studystreak-demo.git](https://github.com/mayurswami2710-svg/studystreak-demo.git)
