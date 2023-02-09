import './App.css';
import { useState } from 'react';
import BeepSound from './assets/audios/beep.mp3';

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [workTime, setWorkTime] = useState(25);
  const [timerState, setTimerState] = useState("Work");
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [onBrake, setOnBrake] = useState(false);

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

  const addWorkTime = (amount) => {
    if (workTime < 60) {
      setWorkTime(workTime + 1);
      if (!isRunning) {
        setDisplayTime(((workTime + 1) * 60));
      }
    }
  };
  const subtractWorkTime = (amount) => {
    if (workTime > 1) {
      setWorkTime(workTime - 1);
      if (!isRunning) {
        setDisplayTime(((workTime - 1) * 60));
      }
    }
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const playPause = () => {
    let seconds = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + seconds;
    let onBrakeVariable = onBrake;

    if (!isRunning) {
      let interval = setInterval(() => {
        if (displayTime <= 0) {
          playBeep();
        }
        date = new Date().getTime();

        if (date > nextDate) {

          setDisplayTime(prev => {
            if(prev === 1){
              playBeep();
            }
            if (prev <= 0 && !onBrakeVariable) {
              onBrakeVariable = true;
              setOnBrake(true);
              setTimerState("Break");
              return breakTime * 60;
            } else if (prev <= 0 && onBrakeVariable) {
              onBrakeVariable = false;
              setOnBrake(false);
              setTimerState("Work");
              return workTime * 60;
            }

            return prev - 1;
          })

          nextDate += seconds;
        }

      }, 30);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    }

    if (isRunning) {
      clearInterval(localStorage.getItem('interval-id'));
    }

    setIsRunning(!isRunning);
  };

  const reset = () => {
    if (isRunning) {
      playPause();
    }
    setBreakTime(5);
    setWorkTime(25);
    setTimerState("Work");
    setDisplayTime(25 * 60);
    setIsRunning(false);
    setOnBrake(false);
    document.getElementById("beep").currentTime = 0;
    document.getElementById("beep").pause();
  };

  const playBeep = () => {
    document.getElementById('beep').play();
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
        <span id="time-left"><h1>{formatTime(displayTime)}</h1></span>
        <audio src={BeepSound} id="beep" type="audio/mp3"></audio>

        <i id='start_stop' class="fa-solid fa-backward-step" onClick={playPause}></i>
        <i id='reset' className="fa-solid fa-repeat" onClick={reset}></i>

      </div>
    </div>
  );
}

export default App;
