/**
 * WanderWise.ai - Main JavaScript
 * Handles theme toggling, language switching, mobile menu, and testimonial carousel
 */

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // State management
  const state = {
    isMobileMenuOpen: false,
    currentTestimonial: 0,
    isDarkMode: false,
    language: "en",
    testimonials: [
      {
        name: "Sarah Mitchell",
        role: "Adventure Enthusiast",
        quote:
          "WanderWise helped me discover hidden gems I never would have found on my own. The AI recommendations were spot-on!",
        avatar: "https://placehold.co/100x100",
      },
      {
        name: "James Cooper",
        role: "Hiking Expert",
        quote:
          "As someone who hikes frequently, I'm impressed by the accuracy of the personalized trail suggestions.",
        avatar: "https://placehold.co/100x100",
      },
      {
        name: "Emma Thompson",
        role: "Travel Blogger",
        quote:
          "The local insights feature is a game-changer. It's like having a local guide in your pocket.",
        avatar: "https://placehold.co/100x100",
      },
    ],
    translations: {
      en: {
        nav: {
          aboutUs: "About Us",
          services: "Services",
          contactUs: "Contact Us",
          legal: "Legal",
          getStarted: "Get Started",
        },
        hero: {
          title: "Plan Your Dream Trip with AI-Powered Recommendations",
          subtitle: "Discover personalized itineraries and local insights.",
          cta: "Get Started",
        },
        features: {
          title: "Why Choose WanderWise",
        },
        testimonials: {
          title: "What Our Adventurers Say",
        },
        cta: {
          title: "Ready to Start Your Journey?",
          subtitle:
            "Join thousands of adventurers discovering their perfect trails with WanderWise.",
          button: "Start Planning Now",
        },
        footer: {
          copyright: "© 2023 WanderWise.ai. All rights reserved.",
          privacy: "Privacy Policy",
          terms: "Terms of Service",
          contact: "Contact",
        },
      },
      zh: {
        nav: {
          aboutUs: "关于我们",
          services: "服务",
          contactUs: "联系我们",
          legal: "法律条款",
          getStarted: "立即开始",
        },
        hero: {
          title: "通过AI驱动的推荐规划您的梦想之旅",
          subtitle: "发现个性化行程和当地见解",
          cta: "立即开始",
        },
        features: {
          title: "为什么选择 WanderWise",
        },
        testimonials: {
          title: "冒险者们的评价",
        },
        cta: {
          title: "准备开始您的旅程？",
          subtitle: "加入数千名使用 WanderWise 探索完美路线的冒险者",
          button: "现在开始规划",
        },
        footer: {
          copyright: "© 2023 WanderWise.ai. 保留所有权利。",
          privacy: "隐私政策",
          terms: "服务条款",
          contact: "联系我们",
        },
      },
    },
  };

  // Cache DOM Elements for better performance
  const body = document.body;
  const mobileMenuToggle = document.querySelector(".btn-menu");
  const mobileMenu = document.querySelector(".nav-mobile");
  const mobileMenuClose = document.querySelector(".btn-close");
  const mobileNavLinks = document.querySelectorAll(
    ".nav-mobile-links .nav-link",
  );
  const themeToggles = document.querySelectorAll(".btn-theme");
  const langToggles = document.querySelectorAll(".btn-lang");
  const carouselTrack = document.querySelector(".carousel-track");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");
  const indicators = document.querySelectorAll(".indicator");

  // Check for user preferences
  const checkUserPreferences = () => {
    // Check for dark mode preference
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (prefersDarkMode) {
      state.isDarkMode = true;
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
    }

    // Check for language preference
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith("zh")) {
      state.language = "zh";
      updateTranslations();
    }
  };

  // Toggle mobile menu with improved accessibility
  function toggleMobileMenu() {
    state.isMobileMenuOpen = !state.isMobileMenuOpen;
    if (state.isMobileMenuOpen) {
      mobileMenu.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      mobileMenuClose.focus(); // Move focus to close button for accessibility
      mobileMenuToggle.setAttribute("aria-expanded", "true");
    } else {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling
      mobileMenuToggle.focus(); // Return focus to toggle button
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
    updateMenuBars();
  }

  // Update menu bars appearance
  function updateMenuBars() {
    const menuBars = document.querySelectorAll(".menu-bar");
    if (state.isMobileMenuOpen) {
      menuBars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      menuBars[1].style.opacity = "0";
      menuBars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      menuBars[0].style.transform = "none";
      menuBars[1].style.opacity = "1";
      menuBars[2].style.transform = "none";
    }
  }

  // Toggle theme with improved accessibility
  function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    if (state.isDarkMode) {
      body.classList.remove("theme-light");
      body.classList.add("theme-dark");
      themeToggles.forEach((toggle) => {
        toggle.setAttribute("aria-label", "Switch to light mode");
      });
    } else {
      body.classList.remove("theme-dark");
      body.classList.add("theme-light");
      themeToggles.forEach((toggle) => {
        toggle.setAttribute("aria-label", "Switch to dark mode");
      });
    }

    // Save preference to localStorage
    localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
  }

  // Toggle language with improved accessibility
  function toggleLanguage() {
    state.language = state.language === "en" ? "zh" : "en";
    updateTranslations();

    // Update aria-labels
    const newLang = state.language === "en" ? "中文" : "English";
    langToggles.forEach((toggle) => {
      toggle.setAttribute("aria-label", `Switch to ${newLang}`);
    });

    // Save preference to localStorage
    localStorage.setItem("language", state.language);
  }

  // Update translations
  function updateTranslations() {
    const currentLang = state.translations[state.language];

    // Update document title
    document.title =
      state.language === "en"
        ? "WanderWise.ai - AI-Powered Travel Recommendations"
        : "WanderWise.ai - AI驱动的旅行推荐";

    // Update navigation
    document.querySelectorAll(".nav-list .nav-link")[0].textContent =
      currentLang.nav.aboutUs;
    document.querySelectorAll(".nav-list .nav-link")[1].textContent =
      currentLang.nav.services;
    document.querySelectorAll(".nav-mobile-links .nav-link")[0].textContent =
      currentLang.nav.aboutUs;
    document.querySelectorAll(".nav-mobile-links .nav-link")[1].textContent =
      currentLang.nav.services;

    // Update buttons
    document.querySelectorAll(".btn-primary").forEach((btn) => {
      if (!btn.classList.contains("btn-large")) {
        btn.textContent = currentLang.nav.getStarted;
      }
    });

    // Update hero section
    document.querySelector(".section-hero .section-title").textContent =
      currentLang.hero.title;
    document.querySelector(".section-hero .section-subtitle").textContent =
      currentLang.hero.subtitle;
    document.querySelector(".section-hero .btn-primary").textContent =
      currentLang.hero.cta;

    // Update features section
    document.querySelector(".section-features .section-title").textContent =
      currentLang.features.title;

    // Update testimonials section
    document.querySelector(".section-testimonials .section-title").textContent =
      currentLang.testimonials.title;

    // Update CTA section
    document.querySelector(".section-cta .section-title").textContent =
      currentLang.cta.title;
    document.querySelector(".section-cta .section-subtitle").textContent =
      currentLang.cta.subtitle;
    document.querySelector(".section-cta .btn-primary").textContent =
      currentLang.cta.button;

    // Update footer
    document.querySelector(".copyright").textContent =
      currentLang.footer.copyright;
    document.querySelectorAll(".footer-link")[0].textContent =
      currentLang.footer.privacy;
    document.querySelectorAll(".footer-link")[1].textContent =
      currentLang.footer.terms;
    document.querySelectorAll(".footer-link")[2].textContent =
      currentLang.footer.contact;
  }

  // Testimonial carousel functions
  function goToTestimonial(index) {
    state.currentTestimonial = index;
    updateCarousel();
  }

  function nextTestimonial() {
    state.currentTestimonial =
      (state.currentTestimonial + 1) % state.testimonials.length;
    updateCarousel();
  }

  function prevTestimonial() {
    state.currentTestimonial =
      state.currentTestimonial === 0
        ? state.testimonials.length - 1
        : state.currentTestimonial - 1;
    updateCarousel();
  }

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${state.currentTestimonial * 100}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === state.currentTestimonial) {
        indicator.classList.add("active");
        indicator.setAttribute("aria-selected", "true");
      } else {
        indicator.classList.remove("active");
        indicator.setAttribute("aria-selected", "false");
      }
    });

    // Update ARIA attributes for accessibility
    const slides = document.querySelectorAll(".carousel-slide");
    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", index !== state.currentTestimonial);
    });
  }

  // Auto-rotate testimonials with performance optimization
  let testimonialInterval;

  function startTestimonialRotation() {
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  function stopTestimonialRotation() {
    clearInterval(testimonialInterval);
  }

  // Load saved preferences
  function loadSavedPreferences() {
    // Load theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      state.isDarkMode = savedTheme === "dark";
      if (state.isDarkMode) {
        body.classList.remove("theme-light");
        body.classList.add("theme-dark");
        themeToggles.forEach((toggle) => {
          toggle.setAttribute("aria-label", "Switch to light mode");
        });
      }
    }

    // Load language preference
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      state.language = savedLanguage;
      updateTranslations();
    }
  }

  // Handle visibility change to pause/resume carousel when tab is inactive
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopTestimonialRotation();
    } else {
      startTestimonialRotation();
    }
  });

  // Event listeners
  function setupEventListeners() {
    // Mobile menu
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    mobileMenuClose.addEventListener("click", toggleMobileMenu);
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", toggleMobileMenu);
    });

    // Theme toggle
    themeToggles.forEach((toggle) => {
      toggle.addEventListener("click", toggleTheme);
    });

    // Language toggle
    langToggles.forEach((toggle) => {
      toggle.addEventListener("click", toggleLanguage);
    });

    // Carousel controls
    prevButton.addEventListener("click", () => {
      stopTestimonialRotation();
      prevTestimonial();
      startTestimonialRotation();
    });

    nextButton.addEventListener("click", () => {
      stopTestimonialRotation();
      nextTestimonial();
      startTestimonialRotation();
    });

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        stopTestimonialRotation();
        goToTestimonial(index);
        startTestimonialRotation();
      });
    });

    // Pause carousel on hover
    carouselTrack.addEventListener("mouseenter", stopTestimonialRotation);
    carouselTrack.addEventListener("mouseleave", startTestimonialRotation);

    // Keyboard navigation for carousel
    document.addEventListener("keydown", (e) => {
      if (
        document.activeElement === prevButton ||
        document.activeElement === nextButton ||
        document.activeElement.closest(".carousel-track")
      ) {
        if (e.key === "ArrowLeft") {
          stopTestimonialRotation();
          prevTestimonial();
          startTestimonialRotation();
          e.preventDefault();
        } else if (e.key === "ArrowRight") {
          stopTestimonialRotation();
          nextTestimonial();
          startTestimonialRotation();
          e.preventDefault();
        }
      }
    });
  }

  // Initialize
  function init() {
    // Check for saved preferences first
    loadSavedPreferences();

    // Then check system preferences if no saved preferences
    if (!localStorage.getItem("theme")) {
      checkUserPreferences();
    }

    // Set up event listeners
    setupEventListeners();

    // Update translations
    updateTranslations();

    // Set initial ARIA attributes
    mobileMenuToggle.setAttribute("aria-expanded", "false");

    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!prefersReducedMotion) {
      startTestimonialRotation();
    }
  }

  // Start the application
  init();
});
