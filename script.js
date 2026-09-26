const requestForm = document.querySelector('#request-form');
const requestSection = document.querySelector('#request');
const contactInput = document.querySelector('#contact');
const formStatus = document.querySelector('#form-status');
const countdown = document.querySelector('#countdown');
const countdownCopy = document.querySelector('#countdown-copy');
const accessCode = document.querySelector('#access-code');
const codeButton = document.querySelector('#code-button');
const accessForm = document.querySelector('#access-form');
const accessStatus = document.querySelector('#access-status');
const countdownLabel = document.querySelector('.countdown-label');
const trackButtons = document.querySelectorAll('.request-track');
const legacyPreviewButton = document.querySelector('#legacy-preview-button');
const legacyPreviewStatus = document.querySelector('#legacy-preview-status');

let requestStarted = false;
let timerId;
const WAIT_SECONDS = 10 * 60;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function selectSong(song) {
  const radio = [...document.querySelectorAll('input[name="song"]')]
    .find((input) => input.value === song);
  if (!radio) return;
  radio.checked = true;
  radio.closest('.song-option')?.scrollIntoView({ block: 'nearest' });
  formStatus.textContent = `“${song}” selected. Add your contact below to start the request.`;
  requestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => contactInput.focus(), 450);
}

trackButtons.forEach((button) => {
  button.addEventListener('click', () => selectSong(button.dataset.song));
});

legacyPreviewButton?.addEventListener('click', () => {
  legacyPreviewStatus.textContent = 'The official Apple catalog confirms this single but does not expose a stable preview audio URL. Playback is therefore unavailable in this static prototype; use the official Apple listing to listen when supported on your device.';
  legacyPreviewButton.textContent = 'Preview unavailable here';
  legacyPreviewButton.disabled = true;
});

function startCountdown() {
  let remaining = WAIT_SECONDS;
  countdown.textContent = formatTime(remaining);
  countdownCopy.textContent = 'Your code entry will become available when the waiting window ends.';
  countdownLabel.innerHTML = '<span class="status-dot"></span> Waiting for confirmation';
  accessCode.disabled = true;
  codeButton.disabled = true;
  clearInterval(timerId);
  timerId = setInterval(() => {
    remaining -= 1;
    countdown.textContent = formatTime(Math.max(remaining, 0));
    if (remaining <= 0) {
      clearInterval(timerId);
      accessCode.disabled = false;
      codeButton.disabled = false;
      countdownCopy.textContent = 'Your confirmation window is open. Enter the code sent to you.';
      countdownLabel.innerHTML = '<span class="status-dot"></span> Confirmation window open';
      accessCode.focus();
    }
  }, 1000);
}

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactInput.value.trim()) return;
  const selectedSong = document.querySelector('input[name="song"]:checked').value;
  requestStarted = true;
  formStatus.textContent = `Request noted for “${selectedSong}” at R10. Your 10-minute confirmation window has started.`;
  formStatus.classList.add('is-confirmed');
  const submitButton = requestForm.querySelector('button[type="submit"]');
  submitButton.innerHTML = 'Request started <span aria-hidden="true">✓</span>';
  submitButton.disabled = true;
  startCountdown();
  document.querySelector('#access-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

accessForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!requestStarted || accessCode.disabled) return;
  accessStatus.textContent = accessCode.value.trim()
    ? 'Code received. In a connected version, your song would open here.'
    : 'Enter the access code to continue.';
});
