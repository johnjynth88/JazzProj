/* ============================================
   BLOOMED - MAIN APP
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
    console.log('Initializing BloomED...');
    
    // Load saved preferences
    this.loadPreferences();
    console.log('Current language preference:', this.currentLanguage);
    
    // Load language translations FIRST - this is critical
    console.log('Loading language files...');
    await this.loadLanguages();
    
    // Apply theme and language AFTER translations are loaded
    this.applyTheme(this.currentTheme);
    console.log('Theme applied:', this.currentTheme);
    
    // Apply language - this will now use loaded translations
    this.applyLanguage(this.currentLanguage);
    console.log('Language applied:', this.currentLanguage);
    
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
      const loadedLanguages = [];
      
      // Get the base URL - handle both file:// and http:// protocols
      const baseURL = new URL('.', window.location.href).href;
      console.log('Base URL for language files:', baseURL);
      
      for (const lang of languages) {
        try {
          // Construct absolute path for language file
          const langFilePath = new URL(`languages/${lang}.json`, baseURL).href;
          console.log(`Loading ${lang} from: ${langFilePath}`);
          
          const response = await fetch(langFilePath);
          if (response.ok) {
            this.translations[lang] = await response.json();
            loadedLanguages.push(lang);
            console.log(`✓ Loaded ${lang} translations successfully`);
          } else {
            console.warn(`Failed to load ${lang}: HTTP ${response.status}`);
          }
        } catch (error) {
          console.error(`Error loading ${lang}:`, error);
        }
      }
      
      console.log('✓ Languages loaded:', loadedLanguages);
      console.log('Translation object keys:', Object.keys(this.translations));
      
      if (loadedLanguages.length === 0) {
        console.error('⚠️ No languages loaded! Check Network tab for failed requests.');
        this.loadFallbackTranslations();
      }
    } catch (error) {
      console.error('Error in loadLanguages:', error);
      this.loadFallbackTranslations();
    }
  }

  loadFallbackTranslations() {
    console.warn('Loading fallback translations...');
    this.translations = {
      english: {
        header: {
          schoolName: "BloomED",
          search: "Search...",
          language: "Language",
          country: "Country",
          theme: "Theme",
          options: {
            english: "English",
            tamil: "Tamil",
            french: "Français",
            hindi: "हिंदी",
            india: "India",
            usa: "USA",
            uk: "UK",
            light: "Light",
            dark: "Dark",
            school: "School",
            nature: "Nature",
            space: "Space",
            cartoon: "Cartoon",
            rainbow: "Rainbow"
          }
        },
        home: {
          welcome: "Welcome",
          greeting: "Good Morning!",
          whatCanIDo: "What can I do for you?"
        },
        cards: {
          quiz: "Quiz",
          puzzle: "Puzzle",
          rapidFire: "Rapid Fire",
          camera: "Camera",
          gallery: "Gallery",
          reminder: "Reminder",
          subjects: "Subjects",
          settings: "Settings",
          achievements: "Achievements"
        },
        common: {
          start: "Start",
          open: "Open",
          manage: "Manage",
          explore: "Explore",
          configure: "Configure"
        }
      },
      french: {
        header: {
          schoolName: "BloomED",
          search: "Rechercher...",
          language: "Langue",
          country: "Pays",
          theme: "Thème"
        },
        home: {
          welcome: "Bienvenue",
          greeting: "Bonjour!",
          whatCanIDo: "Que puis-je faire pour vous?"
        },
        common: {
          start: "Commencer",
          open: "Ouvrir",
          manage: "Gérer",
          explore: "Explorer",
          configure: "Configurer"
        }
      },
      tamil: {
        header: {
          schoolName: "BloomED",
          search: "தேடல்...",
          language: "மொழி",
          country: "நாடு",
          theme: "தீம்"
        },
        home: {
          welcome: "வரவேற்கிறோம்",
          greeting: "வணக்கம்!",
          whatCanIDo: "நான் உனக்கு என்ன செய்ய முடியும்?"
        },
        common: {
          start: "தொடங்கவும்",
          open: "திறக்கவும்",
          manage: "நிர்வகிக்கவும்",
          explore: "ஆராயவும்",
          configure: "கட்டமைக்கவும்"
        }
      },
      hindi: {
        header: {
          schoolName: "BloomED",
          search: "खोजें...",
          language: "भाषा",
          country: "देश",
          theme: "थीम"
        },
        home: {
          welcome: "स्वागत है",
          greeting: "गुड मॉर्निंग!",
          whatCanIDo: "मैं आपके लिए क्या कर सकता हूं?"
        },
        common: {
          start: "शुरू करें",
          open: "खोलें",
          manage: "प्रबंधित करें",
          explore: "खोजें",
          configure: "कॉन्फ़िगर करें"
        }
      }
    };
    console.log('✓ Fallback translations loaded');
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
    console.log(`Updating page language to: ${this.currentLanguage}`);
    console.log('Available translations:', Object.keys(this.translations));
    console.log('Current language translations:', this.translations[this.currentLanguage] ? '✓ Loaded' : '✗ Not loaded');
    
    const elements = document.querySelectorAll('[data-i18n]');
    console.log(`Found ${elements.length} elements with data-i18n attribute`);
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      
      // Store original text on first load if not already stored
      if (!element.hasAttribute('data-i18n-original')) {
        const originalText = element.textContent || element.placeholder || '';
        element.setAttribute('data-i18n-original', originalText);
      }
      
      const translation = this.getTranslation(key);
      const originalText = element.getAttribute('data-i18n-original');
      
      // Use translation if found, otherwise use original text
      const textToUse = (translation !== key) ? translation : originalText;
      
      // Handle different element types
      if (element.tagName === 'OPTION') {
        element.textContent = textToUse;
      } else if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
        element.placeholder = textToUse;
      } else if (element.tagName === 'SELECT') {
        // Skip select element itself
      } else {
        element.textContent = textToUse;
      }
    });

    // Update option elements in selects
    const options = document.querySelectorAll('option[data-i18n]');
    options.forEach(option => {
      // Store original text on first load if not already stored
      if (!option.hasAttribute('data-i18n-original')) {
        option.setAttribute('data-i18n-original', option.textContent);
      }
      
      const key = option.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      const originalText = option.getAttribute('data-i18n-original');
      
      // Use translation if found, otherwise use original text
      const textToUse = (translation !== key) ? translation : originalText;
      option.textContent = textToUse;
    });

    document.documentElement.lang = this.currentLanguage;
    console.log(`✓ Page language updated to: ${this.currentLanguage}`);
  }

  getTranslation(key) {
    if (!key) return '';
    
    const keys = key.split('.');
    
    // Try to get translation in current language
    let value = this.translations[this.currentLanguage];
    
    if (!value) {
      console.warn(`Translations for ${this.currentLanguage} not loaded. Available:`, Object.keys(this.translations));
      // Fallback to English if current language not available
      value = this.translations['english'];
    }
    
    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // Return translation if found, otherwise return original key as indicator
    if (value && typeof value === 'string') {
      return value;
    }
    
    console.warn(`Translation not found for key: ${key} in language: ${this.currentLanguage}`);
    return key;
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
    const fileName = window.location.href.toLowerCase();
    
    // Don't redirect if already on welcome or login page
    if (!fileName.includes('welcome') && !fileName.includes('login')) {
      window.location.href = 'welcome.html';
    }
  }

  showLoggedInView() {
    const fileName = window.location.href.toLowerCase();
    
    // Don't redirect if already on index page
    if (fileName.includes('login') || fileName.includes('welcome')) {
      window.location.href = 'index.html';
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
      console.log('Attaching language selector change listener...');
      languageSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        console.log(`🌐 Language changed to: ${selectedLang}`);
        this.applyLanguage(selectedLang);
        console.log(`✓ Language applied: ${this.currentLanguage}`);
      });
    } else {
      console.warn('Language select element not found!');
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

    // Back button - navigate to previous page
    const backBtn = document.querySelector('.header-actions .action-btn[title="Back"]');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        // Try to go back in browser history, fallback to homepage if no history
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = 'index.html';
        }
      });
    }

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
      const profilePopover = document.getElementById('profilePopover');
      const profileBtn = document.getElementById('profileBtn');
      if (profilePopover && profileBtn && 
          !profilePopover.contains(e.target) && 
          !profileBtn.contains(e.target) &&
          !e.target.closest('.profile-btn')) {
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
