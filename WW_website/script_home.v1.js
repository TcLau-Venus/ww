import i18next from 'i18next';
import Backend from 'i18next-http-backend';

// Initialize i18next
i18next
  .use(Backend)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    backend: {
      loadPath: '/locales/{{lng}}.json'
    }
  }, function(err, t) {
    if (!err) updateContent();
  });

// Update all elements with data-i18n
function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = i18next.t(key);
    if (translation) {
      el.textContent = translation;
    }
  });
}

// Language toggle button
document.querySelectorAll('.btn-lang').forEach(button => {
  button.addEventListener('click', () => {
    const newLang = i18next.language === 'en' ? 'zh' : 'en';
    i18next.changeLanguage(newLang, (err, t) => {
      if (!err) updateContent();
    });
  });
});
