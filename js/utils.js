/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

class Utils {
  // Date/Time utilities
  static formatDate(date, format = 'DD/MM/YYYY') {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return format
      .replace('DD', day)
      .replace('MM', month)
      .replace('YYYY', year)
      .replace('HH', hours)
      .replace('mm', minutes);
  }

  static formatTime(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  static getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  static getDayName(date = new Date()) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  static isToday(date) {
    const today = new Date();
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toDateString() === today.toDateString();
  }

  static isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toDateString() === tomorrow.toDateString();
  }

  // String utilities
  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static truncate(str, length = 100) {
    return str.length > length ? str.slice(0, length) + '...' : str;
  }

  static generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Number utilities
  static formatNumber(num) {
    return num.toLocaleString();
  }

  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Array utilities
  static groupBy(arr, key) {
    return arr.reduce((groups, item) => {
      const groupKey = item[key];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
  }

  static unique(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
  }

  // DOM utilities
  static addClass(element, className) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    element?.classList.add(className);
  }

  static removeClass(element, className) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    element?.classList.remove(className);
  }

  static toggleClass(element, className) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    element?.classList.toggle(className);
  }

  static hasClass(element, className) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    return element?.classList.contains(className) || false;
  }

  static show(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) element.style.display = '';
  }

  static hide(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    if (element) element.style.display = 'none';
  }

  // Animation utilities
  static animate(element, animationName, duration = 0.5) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    
    element.style.animation = `${animationName} ${duration}s ease`;
    setTimeout(() => {
      element.style.animation = '';
    }, duration * 1000);
  }

  // Debounce and Throttle
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Notification utilities
  static showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="close-notification">×</button>
    `;

    document.body.appendChild(notification);

    notification.querySelector('.close-notification').addEventListener('click', () => {
      notification.remove();
    });

    setTimeout(() => {
      notification.remove();
    }, duration);
  }

  // Color utilities
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }

  // File utilities
  static getFileExtension(filename) {
    return filename.split('.').pop().toLowerCase();
  }

  static formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  // Deep Clone
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (obj instanceof Object) {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  }

  // Quotes
  static getRandomQuote() {
    const quotes = [
      "Education is the most powerful weapon which you can use to change the world.",
      "The beautiful thing about learning is that no one can take it away from you.",
      "Education is not the filling of a pail, but the lighting of a fire.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "Learning is a treasure that will follow its owner everywhere.",
      "The expert in anything was once a beginner.",
      "Knowledge is power.",
      "Dream big and dare to fail.",
      "Your limitation—it's only your imagination.",
      "Great things never came from comfort zones."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}
