(() => {
  const list = document.querySelector('#lead-list');
  const select = document.querySelector('#lead-sort');
  if (!list || !select) return;
  select.addEventListener('change', () => {
    const cards = [...list.querySelectorAll('.lead-card')];
    const key = select.value;
    cards.sort((a, b) => (a.dataset[key] || '').localeCompare(b.dataset[key] || '', undefined, {numeric: true}));
    cards.forEach(card => list.appendChild(card));
  });
})();
