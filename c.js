let timerInterval;
let startTime;
let elapsedTime = 0;
let laps = [];

const timerDisplay = document.querySelector('.timer');
const lapList = document.getElementById('lapList');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', lap);
resetBtn.addEventListener('click', reset);

function startStop() {
  if (!timerInterval) {
    startTimer();
    startStopBtn.textContent = 'Stop';
  } else {
    stopTimer();
    startStopBtn.textContent = 'Start';
  }
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function displayTime(time) {
  let centiseconds = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  centiseconds = centiseconds < 10 ? '0' + centiseconds : centiseconds;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;

  timerDisplay.textContent = `${hours}:${minutes}:${seconds}.${centiseconds}`;
}

function lap() {
  if (timerInterval) {
    laps.push(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(elapsedTime);
    lapList.appendChild(lapItem);
  }
}

function reset() {
  stopTimer();
  elapsedTime = 0;
  laps = [];
  displayTime(elapsedTime);
  lapList.innerHTML = '';
}

function formatTime(time) {
  let centiseconds = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  centiseconds = centiseconds < 10 ? '0' + centiseconds : centiseconds;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  hours = hours < 10 ? '0' + hours : hours;

  return `${hours}:${minutes}:${seconds}.${centiseconds}`;
}

