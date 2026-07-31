import React, { useState, useEffect } from 'react';

export default function StudyStreak() {
  // ---------------------------------------------------------------------------
  // 1. CONSTANTS & INITIAL STATE (with LocalStorage persistence)
  // ---------------------------------------------------------------------------
  const WORK_TIME = 25 * 60;       // 25 mins
  const SHORT_BREAK = 5 * 60;      // 5 mins
  const LONG_BREAK = 15 * 60;      // 15 mins

  const [timerMode, setTimerMode] = useState('work'); // 'work', 'shortBreak', 'longBreak'
  
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem('studyStreak_timeLeft');
    return saved ? parseInt(saved, 10) : WORK_TIME;
  });

  const [isRunning, setIsRunning] = useState(false);

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('studyStreak_streak');
    return saved ? parseInt(saved, 10) : 5;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studyStreak_tasks');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Review React state management hooks', completed: true },
      { id: 2, text: 'Complete Data Structures assignment', completed: false },
      { id: 3, text: 'Prepare presentation notes for Edu on Air', completed: false },
    ];
  });

  const [newTaskText, setNewTaskText] = useState('');

  // ---------------------------------------------------------------------------
  // 2. PERSISTENCE EFFECTS
  // ---------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem('studyStreak_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('studyStreak_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    localStorage.setItem('studyStreak_timeLeft', timeLeft.toString());
  }, [timeLeft]);

  // ---------------------------------------------------------------------------
  // 3. TIMER LOGIC & BROWSER TITLE SYNC
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      
      // Auto-switch mode when timer finishes
      if (timerMode === 'work') {
        alert('🎉 Work session complete! Take a break.');
        switchMode('shortBreak');
      } else {
        alert('⚡ Break is over! Time to get back to work.');
        switchMode('work');
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerMode]);

  // Dynamic Browser Tab Title Sync
  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.title = isRunning 
      ? `(${formattedTime}) StudyStreak App` 
      : 'StudyStreak App';
  }, [timeLeft, isRunning]);

  // ---------------------------------------------------------------------------
  // 4. HANDLERS
  // ---------------------------------------------------------------------------
  const switchMode = (mode) => {
    setIsRunning(false);
    setTimerMode(mode);
    if (mode === 'work') setTimeLeft(WORK_TIME);
    if (mode === 'shortBreak') setTimeLeft(SHORT_BREAK);
    if (mode === 'longBreak') setTimeLeft(LONG_BREAK);
  };

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    setIsRunning(false);
    if (timerMode === 'work') setTimeLeft(WORK_TIME);
    if (timerMode === 'shortBreak') setTimeLeft(SHORT_BREAK);
    if (timerMode === 'longBreak') setTimeLeft(LONG_BREAK);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTaskComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ---------------------------------------------------------------------------
  // 5. RENDER UI
  // ---------------------------------------------------------------------------
  return (
    <div style={styles.container}>
      {/* App Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>StudyStreak App</h1>
        <div style={styles.streakBadge}>🔥 {streak} Day Streak</div>
      </header>

      {/* Timer Card */}
      <div style={styles.card}>
        {/* Mode Selectors (Breaks Controls) */}
        <div style={styles.modeToggleGroup}>
          <button
            onClick={() => switchMode('work')}
            style={timerMode === 'work' ? styles.activeModeBtn : styles.modeBtn}
          >
            Work (25m)
          </button>
          <button
            onClick={() => switchMode('shortBreak')}
            style={timerMode === 'shortBreak' ? styles.activeModeBtn : styles.modeBtn}
          >
            Short Break (5m)
          </button>
          <button
            onClick={() => switchMode('longBreak')}
            style={timerMode === 'longBreak' ? styles.activeModeBtn : styles.modeBtn}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Display Header */}
        <h2 style={styles.cardTitle}>
          {timerMode === 'work' && 'Work Session'}
          {timerMode === 'shortBreak' && 'Short Break'}
          {timerMode === 'longBreak' && 'Long Break'}
        </h2>

        {/* Dynamic Countdown Display */}
        <div style={styles.timerDisplay}>{formatTime(timeLeft)}</div>

        {/* Action Controls */}
        <div style={styles.buttonGroup}>
          <button
            onClick={toggleTimer}
            style={{
              ...styles.button,
              backgroundColor: isRunning ? '#ef4444' : '#10b981',
            }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} style={styles.secondaryButton}>
            Reset
          </button>
        </div>
      </div>

      {/* Tasks Card */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Study Tasks</h2>

        <form onSubmit={handleAddTask} style={styles.taskForm}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.addButton}>
            Add
          </button>
        </form>

        <ul style={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.taskItem}>
              <div
                onClick={() => toggleTaskComplete(task.id)}
                style={styles.taskTextContainer}
              >
                <span style={styles.checkbox}>
                  {task.completed ? '🟢' : '⭕'}
                </span>
                <span
                  style={{
                    ...styles.taskText,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    opacity: task.completed ? 0.6 : 1,
                  }}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                style={styles.deleteButton}
                title="Delete task"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. STYLES
// ---------------------------------------------------------------------------
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#38bdf8',
    margin: 0,
  },
  streakBadge: {
    marginTop: '0.5rem',
    color: '#fb923c',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '420px',
    marginBottom: '1.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  modeToggleGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.4rem',
    marginBottom: '1.2rem',
  },
  modeBtn: {
    backgroundColor: 'transparent',
    border: '1px solid #334155',
    color: '#94a3b8',
    padding: '0.4rem 0.6rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    cursor: 'pointer',
  },
  activeModeBtn: {
    backgroundColor: '#38bdf8',
    border: '1px solid #38bdf8',
    color: '#0f172a',
    fontWeight: 'bold',
    padding: '0.4rem 0.6rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    cursor: 'pointer',
  },
  cardTitle: {
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
    color: '#94a3b8',
    fontWeight: '500',
  },
  timerDisplay: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    color: '#38bdf8',
    margin: '0.5rem 0 1.2rem 0',
    letterSpacing: '2px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem',
  },
  button: {
    border: 'none',
    color: '#ffffff',
    fontWeight: 'bold',
    padding: '0.6rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  secondaryButton: {
    border: 'none',
    backgroundColor: '#334155',
    color: '#ffffff',
    fontWeight: '500',
    padding: '0.6rem 1.5rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  taskForm: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.6rem 0.8rem',
    borderRadius: '6px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    outline: 'none',
    fontSize: '0.85rem',
  },
  addButton: {
    backgroundColor: '#06b6d4',
    border: 'none',
    color: '#ffffff',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  taskList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  taskItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0f172a',
    padding: '0.6rem 0.8rem',
    borderRadius: '6px',
    marginBottom: '0.5rem',
    border: '1px solid #334155',
  },
  taskTextContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    cursor: 'pointer',
    textAlign: 'left',
  },
  checkbox: {
    fontSize: '0.8rem',
  },
  taskText: {
    fontSize: '0.85rem',
    color: '#e2e8f0',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#f87171',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};
