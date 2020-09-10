// const { reset } = require("browser-sync");

let countdown;
const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');
const pauseButton = document.querySelector('.pause_button');
const stopButton = document.querySelector('.stop_button');

function timer(seconds) {
  // 현재 작동하는 타이머를 리셋한다
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // 멈춰야 할 때를 알리는 코드
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const adjustedSeconds = remainderSeconds < 10 ? '0' : '';
  const display = `${minutes}:${adjustedSeconds}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  const dayNight = hour > 12 ? '오후' : '오전'
  const adjustedHour = hour < 10 ? '0' : ''
  const adjustedHour2 = hour > 12 ? hour -12 : hour
  const adjustedMinutes = minutes < 10 ? '0' : ''
  endTime.textContent = `${dayNight} ${adjustedHour}${adjustedHour2}:${adjustedMinutes}${minutes}에 만나요 ^-^`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

/* 추후 재작성 예정
function pauseTimer() {
  clearInterval(countdown);
  countdown = null;
}

function restartTimer() {
  startTimer();
}

function stopTimer() {
  stopButton.reset();
}
*/

buttons.forEach(button => button.addEventListener('click', startTimer))

// stopButton.(button => button.addEventListener('close', ))

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});