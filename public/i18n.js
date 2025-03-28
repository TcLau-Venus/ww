// i18n configuration
document.addEventListener("DOMContentLoaded", function () {
    // Initialize i18next
    i18next
      .use(i18nextHttpBackend)
      .use(i18nextBrowserLanguageDetector)
      .init({
        fallbackLng: "en",
        debug: false,
        ns: ["translation"],
        defaultNS: "translation",
        backend: {
          loadPath: "locales/{{lng}}.json",
        },
      })
      .then(function (t) {
        // Initialize the language toggle
        updateContent();
        setupLanguageToggle();
      });
  
    function updateContent() {
      document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        element.textContent = i18next.t(key);
      });
    }
  
    function setupLanguageToggle() {
      const languageToggleButtons = document.querySelectorAll(
        ".language-toggle, .mobile-language-toggle",
      );
  
      languageToggleButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const newLang = i18next.language === "en" ? "zh" : "en";
          i18next.changeLanguage(newLang).then(() => {
            updateContent();
            updateLanguageButtons();
          });
        });
      });
  
      updateLanguageButtons();
    }
  
    function updateLanguageButtons() {
      const languageToggleButtons = document.querySelectorAll(
        ".language-toggle, .mobile-language-toggle",
      );
  
      languageToggleButtons.forEach((button) => {
        const langSpans = button.querySelectorAll("span");
        langSpans.forEach((span) => {
          span.style.display = "none";
        });
  
        if (i18next.language === "en") {
          button.querySelector(".lang-zh").style.display = "inline";
        } else {
          button.querySelector(".lang-en").style.display = "inline";
        }
      });
    }
  });
  