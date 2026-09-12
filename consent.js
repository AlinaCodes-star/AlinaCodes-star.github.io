// Банер згоди на аналітику (Google Consent Mode v2).
// За замовчуванням лічильник Google Analytics уже заборонений — це
// налаштовано в index.html, ДО завантаження gtag.js. Цей файл лише
// вирішує, показувати банер чи ні, і повідомляє gtag, якщо людина
// натиснула «Прийняти».
(() => {
  const STORAGE_KEY = 'cookie_consent'; // 'granted' | 'denied'

  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  function grantConsent() {
    // gtag визначений у index.html до цього файлу.
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  }

  let saved;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    // Приватний режим браузера чи заблоковане сховище — просто
    // питаємо щоразу наново, це не критично.
    saved = null;
  }

  if (saved === 'granted') {
    grantConsent();
  } else if (saved !== 'denied') {
    // Вибору ще не було — показуємо банер.
    banner.hidden = false;
  }
  // saved === 'denied': нічого не робимо, за замовчуванням і так відмова.

  acceptBtn.addEventListener('click', () => {
    grantConsent();
    try { localStorage.setItem(STORAGE_KEY, 'granted'); } catch (err) {}
    banner.hidden = true;
  });

  declineBtn.addEventListener('click', () => {
    try { localStorage.setItem(STORAGE_KEY, 'denied'); } catch (err) {}
    banner.hidden = true;
  });
})();
