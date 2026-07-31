import React, { useState, useEffect } from 'react';

export default function App() {
  // --- STATE MANAGEMENT ---
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('work'); // 'work' or 'break'

  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review React state management hooks', completed: true },
    { id: 2, text: 'Complete Data Structures assignment', completed: false },
    {
      id: 3,
      text: 'Prepare presentation notes for Edu on Air',
      completed: false,
    },
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  // --- TIMER EFFECT ---
  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (timerMode === 'work') {
        alert('Pomodoro session complete! Take a 5-minute break.');
        setTimerMode('break');
        setTimeLeft(5 * 60);
      } else {
        alert('Break finished! Ready to work?');
        setTimerMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode]);

  // --- HELPER FUNCTIONS ---
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timerMode === 'work' ? 25 * 60 : 5 * 60);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTaskText, completed: false },
    ]);
    setNewTaskText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // --- RENDER COMPONENT ---
  return (
    <div
      style={{
        padding: '30px 20px',
        fontFamily: 'Arial, sans-serif',
        background: '#0F172A',
        color: '#FFF',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#38BDF8', marginBottom: '8px' }}>
          StudyStreak App
        </h1>
        <p style={{ fontSize: '18px', color: '#F97316', marginBottom: '24px' }}>
          🔥 5 Day Streak
        </p>

        {/* TIMER SECTION */}
        <div
          style={{
            background: '#1E293B',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)',
          }}
        >
          <h2 style={{ marginTop: 0, textTransform: 'capitalize' }}>
            {timerMode} Session
          </h2>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              margin: '16px 0',
              color: '#38BDF8',
            }}
          >
            {formatTime(timeLeft)}
          </div>
          <div
            style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
          >
            <button
              onClick={() => setIsRunning(!isRunning)}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                background: isRunning ? '#EF4444' : '#22C55E',
                color: '#FFF',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                background: '#64748B',
                color: '#FFF',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* TASKS SECTION */}
        <div
          style={{
            background: '#1E293B',
            padding: '24px',
            borderRadius: '12px',
            textAlign: 'left',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)',
          }}
        >
          <h2 style={{ marginTop: 0, textAlign: 'center' }}>Study Tasks</h2>

          <form
            onSubmit={addTask}
            style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}
          >
            <input
              type="text"
              placeholder="Add a new task..."
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #334155',
                background: '#0F172A',
                color: '#FFF',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 16px',
                borderRadius: '6px',
                border: 'none',
                background: '#38BDF8',
                color: '#0F172A',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </form>

          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {tasks.map((task) => (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#0F172A',
                  padding: '12px',
                  borderRadius: '6px',
                }}
              >
                <div
                  onClick={() => toggleTask(task.id)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#94A3B8' : '#FFF',
                  }}
                >
                  <span>{task.completed ? '✅' : '⭕'}</span>
                  <span>{task.text}</span>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#EF4444',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
