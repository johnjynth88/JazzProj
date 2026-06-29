/* ============================================
   WELCOME PAGE - JAVASCRIPT FUNCTIONALITY
   ============================================ */

class WelcomePage {
  constructor() {
    this.loginModal = document.getElementById('loginModal');
    this.closeLoginModal = document.getElementById('closeLoginModal');
    this.loginBtnHero = document.getElementById('loginBtnHero');
    this.loginBtnCTA = document.getElementById('loginBtnCTA');
    this.agreeTerms = document.getElementById('agreeTerms');
    this.accordionItems = document.querySelectorAll('.accordion-item');
    
    // Modal tabs and forms
    this.modalLoginTab = document.getElementById('modalLoginTab');
    this.modalSignupTab = document.getElementById('modalSignupTab');
    this.modalLoginForm = document.getElementById('modalLoginForm');
    this.modalSignupForm = document.getElementById('modalSignupForm');
    this.welcomeLoginForm = document.getElementById('welcomeLoginForm');
    this.welcomeSignupForm = document.getElementById('welcomeSignupForm');
    
    this.init();
  }

  init() {
    console.log('Initializing Welcome Page...');
    this.setupEventListeners();
    this.setupAccordion();
    this.setupScrollAnimations();
    this.setupFormValidation();
  }

  setupEventListeners() {
    // Login button handlers
    if (this.loginBtnHero) {
      this.loginBtnHero.addEventListener('click', () => this.openLoginModal());
    }

    if (this.loginBtnCTA) {
      this.loginBtnCTA.addEventListener('click', () => this.openLoginModal());
    }

    // Close modal handlers
    if (this.closeLoginModal) {
      this.closeLoginModal.addEventListener('click', () => this.closeLogin());
    }

    // Close modal on background click
    if (this.loginModal) {
      this.loginModal.addEventListener('click', (e) => {
        if (e.target === this.loginModal) {
          this.closeLogin();
        }
      });
    }

    // Keyboard escape to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.loginModal?.classList.contains('active')) {
        this.closeLogin();
      }
    });

    // Modal tabs
    if (this.modalLoginTab) {
      this.modalLoginTab.addEventListener('click', () => this.switchModalTab('login'));
    }
    if (this.modalSignupTab) {
      this.modalSignupTab.addEventListener('click', () => this.switchModalTab('signup'));
    }

    // Form submissions
    if (this.welcomeLoginForm) {
      this.welcomeLoginForm.addEventListener('submit', (e) => this.handleLoginSubmit(e));
    }
    if (this.welcomeSignupForm) {
      this.welcomeSignupForm.addEventListener('submit', (e) => this.handleSignupSubmit(e));
    }

    // Terms checkbox handler
    if (this.agreeTerms) {
      this.agreeTerms.addEventListener('change', () => {
        this.updateLoginButtonState();
      });
    }
  }

  setupAccordion() {
    this.accordionItems.forEach((item) => {
      const header = item.querySelector('.accordion-header');
      if (header) {
        header.addEventListener('click', () => {
          this.toggleAccordion(item);
        });
      }
    });
  }

  toggleAccordion(clickedItem) {
    // Close other items
    this.accordionItems.forEach((item) => {
      if (item !== clickedItem && item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    // Toggle clicked item
    clickedItem.classList.toggle('active');
  }

  switchModalTab(tab) {
    if (tab === 'login') {
      this.modalLoginTab.classList.add('active');
      this.modalSignupTab.classList.remove('active');
      this.modalLoginForm.classList.add('active');
      this.modalSignupForm.classList.remove('active');
    } else {
      this.modalSignupTab.classList.add('active');
      this.modalLoginTab.classList.remove('active');
      this.modalSignupForm.classList.add('active');
      this.modalLoginForm.classList.remove('active');
    }
  }

  openLoginModal() {
    if (!this.agreeTerms.checked) {
      this.showNotification('Please read and agree to the Terms & Conditions first', 'warning');
      // Auto-scroll to terms section
      document.querySelector('.terms-section').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    if (this.loginModal) {
      this.loginModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeLogin() {
    if (this.loginModal) {
      this.loginModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  updateLoginButtonState() {
    const isAgreed = this.agreeTerms.checked;
    if (this.loginBtnHero) {
      this.loginBtnHero.disabled = !isAgreed;
      this.loginBtnHero.style.opacity = isAgreed ? '1' : '0.6';
      this.loginBtnHero.style.cursor = isAgreed ? 'pointer' : 'not-allowed';
    }
    if (this.loginBtnCTA) {
      this.loginBtnCTA.disabled = !isAgreed;
      this.loginBtnCTA.style.opacity = isAgreed ? '1' : '0.6';
      this.loginBtnCTA.style.cursor = isAgreed ? 'pointer' : 'not-allowed';
    }
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('modalLoginEmail').value.trim();
    const password = document.getElementById('modalLoginPassword').value.trim();
    const rememberMe = document.getElementById('modalRememberMe').checked;

    if (!email || !password) {
      this.showNotification('Please fill in all fields', 'warning');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showNotification('Please enter a valid email address', 'warning');
      return;
    }

    // Save user data
    const userData = { email, rememberMe, loginTime: new Date().toISOString() };
    localStorage.setItem('portal_user', JSON.stringify(userData));
    localStorage.setItem('portal_theme', 'light');

    this.showNotification('Login successful! Redirecting...', 'success');
    
    // Redirect to main application after 1 second
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }

  handleSignupSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('modalSignupName').value.trim();
    const email = document.getElementById('modalSignupEmail').value.trim();
    const age = document.getElementById('modalSignupAge').value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const className = document.getElementById('modalSignupClass').value;
    const password = document.getElementById('modalSignupPassword').value.trim();

    if (!name || !email || !age || !gender || !className || !password) {
      this.showNotification('Please fill in all fields', 'warning');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showNotification('Please enter a valid email address', 'warning');
      return;
    }

    if (password.length < 6) {
      this.showNotification('Password must be at least 6 characters', 'warning');
      return;
    }

    // Save new user data
    const userData = {
      name,
      email,
      age,
      gender,
      class: className,
      registrationTime: new Date().toISOString(),
      isNewUser: true
    };
    
    localStorage.setItem('portal_user', JSON.stringify(userData));
    localStorage.setItem('portal_theme', 'light');

    this.showNotification('Account created successfully! Welcome aboard!', 'success');
    
    // Redirect to main application after 1 second
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }

  setupFormValidation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group select');
    inputs.forEach((input) => {
      input.addEventListener('blur', () => {
        const error = input.parentElement.querySelector('.form-error');
        if (error && input.value.trim() === '') {
          error.textContent = 'This field is required';
        } else if (error) {
          error.textContent = '';
        }
      });

      input.addEventListener('focus', () => {
        const error = input.parentElement.querySelector('.form-error');
        if (error) {
          error.textContent = '';
        }
      });
    });
  }

  setupScrollAnimations() {
    // Add scroll animation to elements
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe cards and sections
    document.querySelectorAll('.feature-card, .activity-box, .testimonial-card, .benefit-item').forEach((el) => {
      observer.observe(el);
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      background: ${type === 'warning' ? '#f59e0b' : type === 'success' ? '#10b981' : '#667eea'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      z-index: 2000;
      animation: slideInRight 0.3s ease-out;
      font-weight: 600;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize Welcome Page when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const welcomePage = new WelcomePage();
  
  // If global portal app exists, update translations
  if (typeof SmartSchoolPortal !== 'undefined' && window.smartSchool) {
    window.smartSchool.updatePageLanguage();
  }
});

// Animation for slide out right
const style = document.createElement('style');
style.textContent = `
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
