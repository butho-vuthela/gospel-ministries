const requestForm = document.querySelector('#request-form');
const contactInput = document.querySelector('#contact');
const formStatus = document.querySelector('#form-status');
const countdown = document.querySelector('#countdown');
const countdownCopy = document.querySelector('#countdown-copy');
const accessCode = document.querySelector('#access-code');
const codeButton = document.querySelector('#code-button');
const accessForm = document.querySelector('#access-form');
const accessStatus = document.querySelector('#access-status');

let requestStarted = false;
let timerId;
const WAIT_SECONDS = 10 * 60;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function startCountdown() {
  let remaining = WAIT_SECONDS;
  countdown.textContent = formatTime(remaining);
  countdownCopy.textContent = 'Your code entry will become available when the waiting window ends.';
  clearInterval(timerId);
  timerId = setInterval(() => {
    remaining -= 1;
    countdown.textContent = formatTime(Math.max(remaining, 0));
    if (remaining <= 0) {
      clearInterval(timerId);
      accessCode.disabled = false;
      codeButton.disabled = false;
      countdownCopy.textContent = 'Your confirmation window is open. Enter the code sent to you.';
      document.querySelector('.countdown-label').innerHTML = '<span class="status-dot"></span> Confirmation window open';
      accessCode.focus();
    }
  }, 1000);
}

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactInput.value.trim()) return;
  const selectedSong = document.querySelector('input[name="song"]:checked').value;
  requestStarted = true;
  formStatus.textContent = `Request noted for “${selectedSong}”. Your 10-minute confirmation window has started.`;
  requestForm.querySelector('button[type="submit"]').textContent = 'Request started ✓';
  requestForm.querySelector('button[type="submit"]').disabled = true;
  startCountdown();
  document.querySelector('#access-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

accessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!requestStarted || accessCode.disabled) return;
  accessStatus.textContent = accessCode.value.trim() ? 'Code received. In a connected version, your song would open here.' : 'Enter the access code to continue.';
});
