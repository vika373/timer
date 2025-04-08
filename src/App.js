import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Запуск/остановка таймера
  const toggleTimer = () => setIsActive(!isActive);

  // Сброс таймера
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
  };

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [isActive]);

  // Форматируем время в формате hh:mm:ss
  const formatTime = (sec) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const remainingSeconds = sec % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.timer}>
        <h1>{formatTime(seconds)}</h1>
        <div style={styles.buttons}>
          <button onClick={toggleTimer} style={styles.button}>
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button onClick={resetTimer} style={styles.button}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Высота экрана
    backgroundColor: '#f0f0f0',
  },
  timer: {
    textAlign: 'center',
    padding: '20px',
    border: '2px solid #333',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttons: {
    marginTop: '20px',
  },
  button: {
    margin: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

export default Timer;