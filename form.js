// Мінімум JS, дозволений винятком у CLAUDE.md — лише для форми заявки.
// Секретів тут немає й бути не може: адреса сервера публічна,
// як адреса дверей, а не ключ від них.
(() => {
  const SERVER_URL = 'https://form-server-production-1b8e.up.railway.app';

  // Ті самі межі, що й на сервері. Перевірка тут — зручність,
  // а не захист: справжня перевірка завжди на сервері.
  const LIMITS = { name: 100, contact: 200, termin: 200, comment: 2000 };
  const LABELS = { name: 'Імʼя', contact: 'Контакт', termin: 'Термін', comment: 'Коментар' };

  const form = document.getElementById('request-form');
  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('.form__submit');

  function showStatus(message, kind) {
    status.textContent = message;
    status.dataset.kind = kind; // 'success' | 'error' | 'pending'
  }

  function validate(data) {
    if (!data.name.trim()) return 'Вкажи імʼя';
    if (!data.contact.trim()) return 'Вкажи контакт';

    for (const [field, max] of Object.entries(LIMITS)) {
      if (data[field] && data[field].length > max) {
        return `Поле «${LABELS[field]}» задовге (максимум ${max} символів)`;
      }
    }
    return null;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());

    const problem = validate(data);
    if (problem) {
      showStatus(problem, 'error');
      return;
    }

    submitBtn.disabled = true;
    showStatus('Надсилаю…', 'pending');

    try {
      const response = await fetch(`${SERVER_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        showStatus('Дякую! Я відповім найближчим часом.', 'success');
        form.reset();
      } else {
        showStatus(result.error || 'Не вдалося надіслати. Спробуй ще раз.', 'error');
      }
    } catch (err) {
      showStatus(
        'Не вдалося звʼязатися із сервером. Напиши на github.com/AlinaCodes-star.',
        'error'
      );
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
