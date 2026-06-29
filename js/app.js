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
    
    // Display user profile in popover
    this.displayUserProfile();
    
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
    console.log('Updating language, found elements:', elements.length);
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      // Handle different element types
      if (element.tagName === 'OPTION') {
        element.textContent = translation;
      } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
        element.placeholder = translation;
      } else if (element.tagName === 'SELECT') {
        // Skip select element itself
      } else {
        element.textContent = translation;
      }
    });

    // Update option elements in selects
    const options = document.querySelectorAll('option[data-i18n]');
    options.forEach(option => {
      const key = option.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      option.textContent = translation;
    });

    document.documentElement.lang = this.currentLanguage;
    console.log('✓ Page language updated to:', this.currentLanguage);
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
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath !== '/welcome.html' && currentPath !== '/login.html' && !currentPath.includes('login')) {
      window.location.href = 'welcome.html';
    }
  }

  showLoggedInView() {
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('login') || currentPath.includes('welcome')) {
      window.location.href = 'dashboard.html';
    }
  }

  setupEventListeners() {
    // Sync select values with current preferences
    const themeSelect = document.getElementById('themeSelect');
    const languageSelect = document.getElementById('languageSelect');
    
    if (themeSelect) {
      themeSelect.value = this.currentTheme;
    }
    if (languageSelect) {
      languageSelect.value = this.currentLanguage;
    }

    // Theme switcher
    if (themeSelect) {
      themeSelect.addEventListener('change', (e) => {
        this.applyTheme(e.target.value);
      });
    }

    // Language switcher
    if (languageSelect) {
      languageSelect.addEventListener('change', (e) => {
        this.applyLanguage(e.target.value);
        languageSelect.value = e.target.value; // Ensure value stays synced
      });
    }

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

    // Profile popover
    const profileBtn = document.getElementById('profileBtn');
    if (profileBtn) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleProfilePopover();
      });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // Settings button
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        window.location.href = 'profile.html';
      });
    }

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
      const profilePopover = document.getElementById('profilePopover');
      const profileBtn = document.getElementById('profileBtn');
      if (profilePopover && profileBtn && 
          !profilePopover.contains(e.target) && 
          !profileBtn.contains(e.target)) {
        profilePopover.classList.remove('active');
      }
    });

    // Initialize profile display
    this.displayUserProfile();
  }

  toggleProfilePopover() {
    const profilePopover = document.getElementById('profilePopover');
    if (profilePopover) {
      profilePopover.classList.toggle('active');
    }
  }

  displayUserProfile() {
    if (this.currentUser) {
      const userName = this.currentUser.name || this.currentUser.email || 'User';
      const userEmail = this.currentUser.email || 'user@example.com';
      const userClass = this.currentUser.class || '-';
      const userAge = this.currentUser.age || '-';
      const userGender = this.currentUser.gender || '-';

      // Update popover
      const userNameEl = document.getElementById('userNameDisplay');
      const userEmailEl = document.getElementById('userEmailDisplay');
      const userClassEl = document.getElementById('userClassDisplay');
      const userAgeEl = document.getElementById('userAgeDisplay');
      const userGenderEl = document.getElementById('userGenderDisplay');

      if (userNameEl) userNameEl.textContent = userName;
      if (userEmailEl) userEmailEl.textContent = userEmail;
      if (userClassEl) userClassEl.textContent = userClass;
      if (userAgeEl) userAgeEl.textContent = userAge;
      if (userGenderEl) userGenderEl.textContent = userGender;

      // Add visual indicator that user is logged in
      const profileBtn = document.getElementById('profileBtn');
      if (profileBtn) {
        profileBtn.style.background = 'rgba(255, 255, 255, 0.3)';
        profileBtn.title = `Logged in as ${userName}`;
      }

      console.log('✓ Profile data loaded for:', userName);
    }
  }

  logout() {
    // Clear user data
    localStorage.removeItem('portal_user');
    localStorage.removeItem('portal_theme');
    localStorage.removeItem('portal_language');

    // Redirect to welcome page
    window.location.href = 'welcome.html';
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
