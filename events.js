// Події для воронки в Google Analytics.
// gtag сам ураховує Consent Mode — подія реально дійде до GA
// лише якщо відвідувач натиснув «Прийняти» на банері згоди.

// Головна кнопка першого екрана. На десктопі це .hero__cta,
// на телефоні цю саму роль виконує липка кнопка знизу (.sticky-cta__btn) —
// обидві веб-версії однієї дії, тож рахуємо їх під однією подією.
document.querySelectorAll('.hero__cta, .sticky-cta__btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    gtag('event', 'click_main_cta');
  });
});

// Посилання-контакт у шапці (зараз веде на GitHub-профіль).
document.querySelector('.btn-ghost')?.addEventListener('click', () => {
  gtag('event', 'click_contact_link');
});
