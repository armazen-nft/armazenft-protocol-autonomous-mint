const dialog = document.querySelector('#proposal-dialog');
document.querySelectorAll('.proposal').forEach((button) => button.addEventListener('click', () => {
  document.querySelector('#proposal-kind').textContent = button.dataset.kind.toUpperCase();
  document.querySelector('#proposal-title').textContent = button.dataset.title;
  dialog.showModal();
}));
document.querySelector('.close').addEventListener('click', () => dialog.close());
document.querySelectorAll('.cookie').forEach((button) => button.addEventListener('click', () => {
  const count = Number(button.dataset.count) + 1;
  button.dataset.count = count;
  button.querySelector('b').textContent = count;
}));
document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  document.querySelectorAll('.art-card').forEach((card) => { card.hidden = button.dataset.filter !== 'all' && card.dataset.mode !== button.dataset.filter; });
}));
document.querySelector('#pulse-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const field = document.querySelector('#pulse-text');
  const text = field.value.trim();
  if (!text) return;
  const item = document.createElement('article');
  item.innerHTML = `<b>Você</b><time>agora</time><p></p>`;
  item.querySelector('p').textContent = text;
  document.querySelector('#events').prepend(item);
  field.value = '';
});
