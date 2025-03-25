import i18next from 'i18next';
import Backend from 'i18next-http-backend';

i18next
  .use(Backend)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    backend: {
      // ✅ Load translation files from same folder as HTML
      loadPath: './{{lng}}.json'
    }
  }, function(err, t) {
    if (!err) updateContent();
  });

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = i18next.t(key);
    if (translation) el.textContent = translation;
  });
}

document.querySelectorAll('.btn-lang').forEach(button => {
  button.addEventListener('click', () => {
    const newLang = i18next.language === 'en' ? 'zh' : 'en';
    i18next.changeLanguage(newLang, (err, t) => {
      if (!err) updateContent();
    });
  });
});
