/* ============================================
   FORM VALIDATION UTILITIES
   ============================================ */

class FormValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  }

  static validatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    return strength;
  }

  static getPasswordStrengthLabel(strength) {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return labels[Math.min(strength, 5)];
  }

  static validateName(name) {
    return name.trim().length >= 3;
  }

  static validateAge(age) {
    const ageNum = parseInt(age);
    return ageNum >= 5 && ageNum <= 25;
  }

  static validateMobileNumber(mobile) {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile.replace(/[\s-]/g, ''));
  }

  static validateForm(formData, rules) {
    const errors = {};
    
    for (const [field, rule] of Object.entries(rules)) {
      const value = formData[field];
      
      if (rule.required && !value) {
        errors[field] = `${field} is required`;
        continue;
      }

      if (rule.type === 'email' && value && !this.validateEmail(value)) {
        errors[field] = 'Invalid email address';
      }

      if (rule.type === 'password' && value && !this.validatePassword(value)) {
        errors[field] = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
      }

      if (rule.type === 'name' && value && !this.validateName(value)) {
        errors[field] = 'Name must be at least 3 characters';
      }

      if (rule.type === 'age' && value && !this.validateAge(value)) {
        errors[field] = 'Age must be between 5 and 25';
      }

      if (rule.type === 'mobile' && value && !this.validateMobileNumber(value)) {
        errors[field] = 'Invalid mobile number';
      }

      if (rule.minLength && value && value.length < rule.minLength) {
        errors[field] = `Minimum length is ${rule.minLength}`;
      }

      if (rule.maxLength && value && value.length > rule.maxLength) {
        errors[field] = `Maximum length is ${rule.maxLength}`;
      }

      if (rule.match && formData[rule.match] !== value) {
        errors[field] = `${field} does not match`;
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  static showFieldError(field, message) {
    const errorElement = document.querySelector(`[data-error="${field}"]`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add('show');
    }

    const inputElement = document.querySelector(`[name="${field}"]`);
    if (inputElement) {
      inputElement.classList.add('error');
    }
  }

  static clearFieldError(field) {
    const errorElement = document.querySelector(`[data-error="${field}"]`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }

    const inputElement = document.querySelector(`[name="${field}"]`);
    if (inputElement) {
      inputElement.classList.remove('error');
    }
  }

  static clearAllErrors() {
    document.querySelectorAll('[data-error]').forEach(el => {
      el.textContent = '';
      el.classList.remove('show');
    });

    document.querySelectorAll('.error').forEach(el => {
      el.classList.remove('error');
    });
  }
}

class LoginValidator {
  static validateLoginForm(formData) {
    const rules = {
      email: { required: true, type: 'email' },
      password: { required: true }
    };
    
    return FormValidator.validateForm(formData, rules);
  }

  static validateSignupForm(formData) {
    const rules = {
      name: { required: true, type: 'name' },
      email: { required: true, type: 'email' },
      password: { required: true, type: 'password' },
      confirmPassword: { required: true, match: 'password' },
      age: { required: true, type: 'age' },
      gender: { required: true },
      class: { required: true },
      section: { required: true },
      school: { required: true },
      parentName: { required: true },
      mobileNumber: { required: true, type: 'mobile' }
    };
    
    return FormValidator.validateForm(formData, rules);
  }
}

class ReminderValidator {
  static validateReminderForm(formData) {
    const rules = {
      title: { required: true, minLength: 3 },
      date: { required: true },
      time: { required: true },
      category: { required: true }
    };
    
    return FormValidator.validateForm(formData, rules);
  }
}
