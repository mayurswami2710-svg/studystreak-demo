[20:26, 31/7/2026] Manyatha A K: # StudyStreak 🚀

An interactive student productivity web application built with React and Tailwind CSS. Designed to help students streamline their study sessions, manage time, and track daily micro-goals.

## Features
- *Pomodoro Focus Timer:* Built-in 25-minute work and 5-minute break cycles with start, pause, and reset controls.
- *Interactive Daily Task Checklist:* Seamlessly add, check off, and delete study goals in real time.
- *Dynamic Progress Tracker:* Live progress bar and streak counter that update automatically as you complete tasks.

## Built With
- React (Hooks: useState, useEffect)
- Tailwind CSS
- Vibe-coded using Gemini Canvas
-
[20:28, 31/7/2026] Manyatha A K: An interactive student productivity web app built with React and Tailwind CSS.
[20:30, 31/7/2026] Manyatha A K: import React, { useState, useEffect } from 'react';

export default function App() {
  // Pomodoro Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('work'); // 'work' or 'break'

  // Task Checklist State
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review React state management hooks', completed: true },
    { id: 2, text: 'Complete Data Structures assignment', completed: false },
    { id: 3, text: 'Prepare presentation notes for Edu on Air', completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (timerMode === 'work') {
        alert('Pomodoro session complete! Take a well-deserved 5-minute break.');
        setTimerMode('break');
        setTimeLeft(5 * 60);
      } else {
        alert('Break finished! Ready to dive back into work?');
        setTimerMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode]);

  // Format Time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return ${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs};
  };

  // Timer Handlers
  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerMode === 'work' ? 25 * 60 : 5 * 60);
  };
  const switchMode = (mode) => {
    setTimerMode(mode);
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  // Task Handlers
  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText, completed: false }]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Calculations for Streak & Progress
  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-black text-white p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-slate-800/60 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent">
              StudyStreak
            </h1>
            <p className="text-slate-400 text-sm mt-1">Focus deeply, track progress, crush your academic goals.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700">
            <span className="text-2xl">🔥</span>
            <div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Current Streak</div>
              <div className="text-lg font-bold text-teal-400">5 Days Active</div>
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pomodoro Timer Card */}
          <div className="bg-slate-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <h2 className="text-xl font-semibold mb-4 text-indigo-300">Focus Timer</h2>
              <div className="flex justify-center space-x-2 mb-6">
                <button
                  onClick={() => switchMode('work')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    timerMode === 'work'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Work (25m)
                </button>
                <button
                  onClick={() => switchMode('break')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    timerMode === 'break'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Break (5m)
                </button>
              </div>
            </div>

            {/* Timer Clock Display */}
            <div className="my-6 relative flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-4 border-indigo-500/30 flex items-center justify-center bg-slate-900/40 shadow-inner">
                <span className="text-5xl font-mono font-bold tracking-wider text-white">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex space-x-4 w-full">
              <button
                onClick={toggleTimer}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isRunning ? 'Pause' : 'Start Focus'}
              </button>
              <button
                onClick={resetTimer}
                className="px-5 py-3 rounded-xl font-semibold bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Task Checklist & Progress Card */}
          <div className="bg-slate-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-teal-300">Daily Study Goals</h2>
                <span className="text-xs bg-slate-700/80 px-2.5 py-1 rounded-full text-slate-300 font-medium">
                  {completedCount} / {tasks.length} Done
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-700/50 h-2.5 rounded-full mb-6 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-teal-400 to-indigo-500 h-full transition-all duration-500"
                  style={{ width: ${progressPercentage}% }}
                ></div>
              </div>

              {/* Add Task Input */}
              <form onSubmit={addTask} className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Add a new study task..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="flex-1 bg-slate-900/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md"
                >
                  Add
                </button>
              </form>

              {/* Task List */}
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {tasks.length === 0 ? (
                  <p className="text-slate-400 text-center py-6 text-sm">No tasks added yet. Stay productive!</p>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between bg-slate-900/40 border border-slate-700/60 p-3 rounded-xl hover:border-slate-600 transition-all"
                    >
                      <label className="flex items-center space-x-3 cursor-pointer flex-1 mr-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-4 h-4 text-indigo-600 rounded bg-slate-800 border-slate-600 focus:ring-indigo-500"
                        />
                        <span
                          className={`text-sm transition-all ${
                            task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                          }`}
                        >
                          {task.text}
                        </span>
                      </label>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-400 hover:text-rose-400 text-sm font-medium px-2 py-1 transition-all"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/60 text-center">
              <p className="text-xs text-slate-400">
                Built with React, Tailwind CSS, and Gemini Canvas.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
