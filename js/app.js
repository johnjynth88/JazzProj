/* ============================================
   SMART SCHOOL LEARNING PORTAL - MAIN APP
   ============================================ */

class SmartSchoolPortal {
  constructor() {
    this.currentUser = null;
    this.currentLanguage = 'english';
    this.currentTheme = 'light';
    this.translations = {};
    this.init();
  }

  async init() {
    console.log('Initializing Smart School Learning Portal...');
    
    // Load saved preferences
    this.loadPreferences();
    
    // Load language translations
    await this.loadLanguages();
    
    // Apply saved theme and language
    this.applyTheme(this.currentTheme);
    this.applyLanguage(this.currentLanguage);
    
    // Check if user is logged in
    this.checkUserSession();
    
    // Initialize event listeners
    this.setupEventListeners();
    
    // Initialize modules
    this.initializeModules();
    
    console.log('✓ Portal initialized successfully');
  }

  loadPreferences() {
    const savedTheme = localStorage.getItem('portal_theme') || 'light';
    const savedLanguage = localStorage.getItem('portal_language') || 'english';
    const savedUser = localStorage.getItem('portal_user');
    
    this.currentTheme = savedTheme;
    this.currentLanguage = savedLanguage;
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;
  }

  async loadLanguages() {
    try {
      const languages = ['english', 'tamil', 'french', 'hindi'];
      
      for (const lang of languages) {
        const response = await fetch(`languages/${lang}.json`);
        if (response.ok) {
          this.translations[lang] = await response.json();
        }
      }
      
      console.log('✓ Languages loaded:', Object.keys(this.translations));
    } catch (error) {
      console.error('Error loading languages:', error);
    }
  }

  applyTheme(theme) {
    document.documentElement.className = `theme-${theme}`;
    this.currentTheme = theme;
    localStorage.setItem('portal_theme', theme);
  }

  applyLanguage(language) {
    this.currentLanguage = language;
    localStorage.setItem('portal_language', language);
    this.updatePageLanguage();
  }

  updatePageLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      element.textContent = translation;
    });

    document.documentElement.lang = this.currentLanguage;
  }

  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

  checkUserSession() {
    if (this.currentUser) {
      this.showLoggedInView();
    } else {
      this.showLoginView();
    }
  }

  showLoginView() {
    if (window.location.pathname !== '/login.html') {
      window.location.href = 'login.html';
    }
  }

  showLoggedInView() {
    if (window.location.pathname === '/login.html') {
      window.location.href = 'dashboard.html';
    }
  }

  setupEventListeners() {
    // Theme switcher
    const themeSelectors = document.querySelectorAll('[data-theme]');
    themeSelectors.forEach(selector => {
      selector.addEventListener('click', (e) => {
        const theme = e.target.getAttribute('data-theme');
        this.applyTheme(theme);
      });
    });

    // Language switcher
    const langSelectors = document.querySelectorAll('[data-language]');
    langSelectors.forEach(selector => {
      selector.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-language');
        this.applyLanguage(lang);
      });
    });

    // Search
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
      searchBox.addEventListener('keyup', (e) => this.handleSearch(e));
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault();
          searchBox?.focus();
        }
      });
    }

    // Hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (hamburgerMenu) {
      hamburgerMenu.addEventListener('click', () => this.toggleMobileMenu());
    }

    // Notifications
    const notificationBtn = document.querySelector('[data-notification]');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', () => this.showNotifications());
    }

    // Profile menu
    const profileBtn = document.querySelector('[data-profile]');
    if (profileBtn) {
      profileBtn.addEventListener('click', () => this.showProfileMenu());
    }

    // Logout
    const logoutBtn = document.querySelector('[data-logout]');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    if (query.length > 0) {
      console.log('Searching for:', query);
      // Search functionality to be implemented
    }
  }

  toggleMobileMenu() {
    const menu = document.querySelector('.header-middle');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  showNotifications() {
    console.log('Show notifications');
    // Notifications to be implemented
  }

  showProfileMenu() {
    console.log('Show profile menu');
    // Profile menu to be implemented
  }

  logout() {
    localStorage.removeItem('portal_user');
    localStorage.removeItem('portal_reminders');
    localStorage.removeItem('portal_gallery');
    this.currentUser = null;
    window.location.href = 'login.html';
  }

  initializeModules() {
    // Initialize modules will be called here
    console.log('Modules initialized');
  }

  login(userData) {
    this.currentUser = userData;
    localStorage.setItem('portal_user', JSON.stringify(userData));
    this.showLoggedInView();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }
}

// Initialize the portal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portal = new SmartSchoolPortal();
});
