import './App.css';
import { useState } from 'react';

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [workTime, setWorkTime] = useState(25);
  const [timerState, setTimerState] = useState("Work");
  const [minutesLeft, setMinutesLeft] = useState(workTime);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const addBreakTime = () => {
    if (breakTime < 60) {
      setBreakTime(breakTime + 1);
    }
  };
  const subtractBreakTime = () => {
    if (breakTime > 1) {
      setBreakTime(breakTime - 1);
    }

  };

  const addWorkTime = () => {
    if (workTime < 60) {
      setWorkTime(workTime + 1);
    }
  };
  const subtractWorkTime = () => {
    if (workTime > 1) {
      setWorkTime(workTime - 1);
    }
  };

  const playPause = () => {
    let miutes = 0;
    let seconds = 0;
    if (isRunning) {

    } else {
      playMinutes();
    }
    function playMinutes() {
      for (let i = 0; i < workTime; i++) {
        playSeconds();
        setTimeout(setMinutesLeft(minutesLeft - 1), 60000);
      }
    }
    function playSeconds() {
      setSecondsLeft(60)
      for (let i = 0; i < 60; i++) {
        setTimeout(setSecondsLeft(secondsLeft - 1), 1000);
      }
    }
  };

  const reset = () => {
    if (isRunning) {
      playPause();
    }
    setBreakTime(5);
    setWorkTime(25);
    setMinutesLeft(`${workTime}`);
    setSecondsLeft(0);
  };

  return (
    <div className="App">
      <div className="times">
        {/* Break time */}
        <div className="break-box">
          <div id="break-label"><b>Break time</b></div>
          <i id='break-increment' className="fa-solid fa-arrow-up" onClick={addBreakTime}></i>
          <span id="break-length"><b>{breakTime}</b></span>
          <i id='break-decrement' className="fa-solid fa-arrow-down" onClick={subtractBreakTime}></i>
        </div>

        {/* Work time */}
        <div className="work-box">
          <div id="session-label"><b>Work time</b></div>
          <i id='session-increment' className="fa-solid fa-arrow-up" onClick={addWorkTime}></i>
          <span id='session-length'><b>{workTime}</b></span>
          <i id='session-decrement' className="fa-solid fa-arrow-down" onClick={subtractWorkTime}></i>
        </div>
      </div>

      {/* Timer box */}
      <div className="timer-box">
        <span id="timer-label"><b>{timerState}</b></span>
        <span id="time-left"><h1>{`${minutesLeft}:${secondsLeft}`}</h1></span>

        <i id='start_stop' class="fa-solid fa-backward-step" onClick={playPause}></i>
        <i id='reset' className="fa-solid fa-repeat" onClick={reset}></i>

      </div>
    </div>
  );
}

export default App;
