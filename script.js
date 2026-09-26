const requestForm = document.querySelector('#request-form');
const requestSection = document.querySelector('#request');
const contactInput = document.querySelector('#contact');
const voucherReference = document.querySelector('#voucher-reference');
const formStatus = document.querySelector('#form-status');
const countdown = document.querySelector('#countdown');
const countdownCopy = document.querySelector('#countdown-copy');
const accessStatus = document.querySelector('#access-status');
const countdownLabel = document.querySelector('.countdown-label');
const trackButtons = document.querySelectorAll('.request-track');
const legacyPreviewButton = document.querySelector('#legacy-preview-button');
const legacyPreviewStatus = document.querySelector('#legacy-preview-status');

let timerId;
const WAIT_SECONDS = 10 * 60;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function selectSong(song) {
  const radio = [...document.querySelectorAll('input[name="song"]')].find((input) => input.value === song);
  if (!radio) return;
  radio.checked = true;
  radio.closest('.song-option')?.scrollIntoView({ block: 'nearest' });
  formStatus.textContent = `“${song}” selected. Choose a voucher and complete the request below.`;
  requestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => voucherReference.focus(), 450);
}

trackButtons.forEach((button) => button.addEventListener('click', () => selectSong(button.dataset.song)));

legacyPreviewButton?.addEventListener('click', () => {
  legacyPreviewStatus.textContent = 'The official Apple catalog confirms this single but does not expose a stable preview audio URL. Playback is therefore unavailable in this static prototype; use the official Apple listing to listen when supported on your device.';
  legacyPreviewButton.textContent = 'Preview unavailable here';
  legacyPreviewButton.disabled = true;
});

function startCountdown(song, voucher) {
  let remaining = WAIT_SECONDS;
  countdown.textContent = formatTime(remaining);
  countdownCopy.textContent = `Manual confirmation window started for “${song}” via ${voucher}.`;
  countdownLabel.innerHTML = '<span class="status-dot"></span> Waiting for manual confirmation';
  clearInterval(timerId);
  timerId = setInterval(() => {
    remaining -= 1;
    countdown.textContent = formatTime(Math.max(remaining, 0));
    if (remaining <= 0) {
      clearInterval(timerId);
      countdownCopy.textContent = 'The 10-minute waiting window is complete. Manual confirmation and delivery are still handled by the ministry team.';
      countdownLabel.innerHTML = '<span class="status-dot"></span> Window complete';
      accessStatus.textContent = 'Your MP3 will be sent to the contact you provided after manual confirmation.';
    }
  }, 1000);
}

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!requestForm.reportValidity()) return;
  const selectedSong = document.querySelector('input[name="song"]:checked').value;
  const voucher = document.querySelector('input[name="voucher"]:checked').value;
  formStatus.textContent = `Request noted for “${selectedSong}” at R10 via ${voucher}. Your 10-minute waiting window has started.`;
  formStatus.classList.add('is-confirmed');
  const submitButton = requestForm.querySelector('button[type="submit"]');
  submitButton.innerHTML = 'Request noted <span aria-hidden="true">✓</span>';
  submitButton.disabled = true;
  startCountdown(selectedSong, voucher);
  document.querySelector('#access-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
