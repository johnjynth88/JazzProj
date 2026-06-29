/* ============================================
   PROFILE PAGE - JAVASCRIPT
   ============================================ */

class ProfileManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    this.currentUser = JSON.parse(localStorage.getItem('portal_user'));
    
    if (!this.currentUser) {
      window.location.href = 'welcome.html';
      return;
    }

    this.displayProfileData();
    this.setupEventListeners();
    
    // Check if edit mode is requested via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
      setTimeout(() => {
        this.openEditModal();
      }, 300);
    }
    
    console.log('✓ Profile Manager initialized');
  }

  displayProfileData() {
    // Header
    document.getElementById('profileNameHeader').textContent = this.currentUser.name || 'User';
    document.getElementById('profileEmailHeader').textContent = this.currentUser.email || 'user@example.com';

    // Profile Details
    document.getElementById('displayName').textContent = this.currentUser.name || '-';
    document.getElementById('displayEmail').textContent = this.currentUser.email || '-';
    document.getElementById('displayClass').textContent = this.currentUser.class || '-';
    document.getElementById('displayAge').textContent = this.currentUser.age || '-';
    document.getElementById('displayGender').textContent = this.currentUser.gender || '-';
    document.getElementById('displayRegistrationDate').textContent = this.formatDate(this.currentUser.registrationTime) || '-';
    document.getElementById('displayLastLogin').textContent = this.formatDate(this.currentUser.loginTime) || 'Today';
    document.getElementById('displaySessionDuration').textContent = this.calculateSessionDuration() || '-';

    // Edit Form
    document.getElementById('editName').value = this.currentUser.name || '';
    document.getElementById('editEmail').value = this.currentUser.email || '';
    document.getElementById('editClass').value = this.currentUser.class || '';
    document.getElementById('editAge').value = this.currentUser.age || '';
    document.getElementById('editGender').value = this.currentUser.gender || '';
  }

  formatDate(timestamp) {
    if (!timestamp) return null;
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calculateSessionDuration() {
    if (!this.currentUser.loginTime) return '-';
    const loginTime = parseInt(this.currentUser.loginTime);
    const now = Date.now();
    const duration = Math.floor((now - loginTime) / 1000); // in seconds

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  }

  setupEventListeners() {
    // Edit Profile Button
    document.getElementById('editProfileBtn').addEventListener('click', () => {
      this.openEditModal();
    });

    // Copy Profile Button
    document.getElementById('copyProfileBtn').addEventListener('click', () => {
      this.copyProfileDetails();
    });

    // Edit Form Submit
    document.getElementById('editProfileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProfileChanges();
    });

    // Close Edit Modal
    document.getElementById('closeEditModal').addEventListener('click', () => {
      this.closeEditModal();
    });

    document.getElementById('cancelEditBtn').addEventListener('click', () => {
      this.closeEditModal();
    });

    // Delete Account Button
    document.getElementById('deleteAccountBtn').addEventListener('click', () => {
      this.showDeleteConfirmation();
    });

    // Change Password Button
    document.getElementById('changePasswordBtn').addEventListener('click', () => {
      this.showPasswordModal();
    });

    // Confirm Modal Actions
    document.getElementById('confirmYes').addEventListener('click', () => {
      this.deleteAccount();
    });

    document.getElementById('confirmNo').addEventListener('click', () => {
      this.closeConfirmModal();
    });

    // Download Data Button
    document.getElementById('downloadDataBtn').addEventListener('click', () => {
      this.downloadProfileData();
    });

    // Close modals on outside click
    document.addEventListener('click', (e) => {
      const editModal = document.getElementById('editProfileModal');
      const confirmModal = document.getElementById('confirmModal');
      
      if (e.target === editModal) {
        this.closeEditModal();
      }
      if (e.target === confirmModal) {
        this.closeConfirmModal();
      }
    });
  }

  openEditModal() {
    document.getElementById('editProfileModal').classList.add('active');
  }

  closeEditModal() {
    document.getElementById('editProfileModal').classList.remove('active');
  }

  saveProfileChanges() {
    const updatedUser = {
      ...this.currentUser,
      name: document.getElementById('editName').value,
      email: document.getElementById('editEmail').value,
      class: document.getElementById('editClass').value,
      age: document.getElementById('editAge').value,
      gender: document.getElementById('editGender').value
    };

    // Validate required fields
    if (!updatedUser.name || !updatedUser.email) {
      this.showToast('Please fill in all required fields', 'error');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedUser.email)) {
      this.showToast('Please enter a valid email address', 'error');
      return;
    }

    // Save to localStorage
    localStorage.setItem('portal_user', JSON.stringify(updatedUser));
    this.currentUser = updatedUser;

    // Refresh display
    this.displayProfileData();
    this.closeEditModal();
    this.showToast('Profile updated successfully!', 'success');

    // Update header profile display
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userNameDisplay) userNameDisplay.textContent = updatedUser.name;
    if (userEmailDisplay) userEmailDisplay.textContent = updatedUser.email;
  }

  copyProfileDetails() {
    const profileText = `
Profile Information:
==================
Name: ${this.currentUser.name}
Email: ${this.currentUser.email}
Class: ${this.currentUser.class}
Age: ${this.currentUser.age}
Gender: ${this.currentUser.gender}
Registration Date: ${this.formatDate(this.currentUser.registrationTime)}
Last Login: ${this.formatDate(this.currentUser.loginTime)}
==================
    `.trim();

    navigator.clipboard.writeText(profileText).then(() => {
      this.showToast('Profile details copied to clipboard!', 'success');
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.showToast('Failed to copy profile details', 'error');
    });
  }

  showDeleteConfirmation() {
    document.getElementById('confirmTitle').textContent = 'Delete Account?';
    document.getElementById('confirmMessage').textContent = 
      'Are you sure you want to permanently delete your account? This action cannot be undone. All your data, progress, and settings will be deleted.';
    document.getElementById('confirmModal').classList.add('active');
  }

  closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('active');
  }

  deleteAccount() {
    // Clear all user data
    localStorage.removeItem('portal_user');
    localStorage.removeItem('portal_theme');
    localStorage.removeItem('portal_language');

    this.showToast('Account deleted successfully. Redirecting...', 'success');
    
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = 'welcome.html';
    }, 1500);
  }

  showPasswordModal() {
    this.showToast('Password change feature coming soon!', 'info');
  }

  downloadProfileData() {
    const profileData = {
      profile: this.currentUser,
      downloadDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `profile_${this.currentUser.name.replace(/\s+/g, '_')}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    this.showToast('Profile data downloaded successfully!', 'success');
  }

  showToast(message, type = 'success') {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize Profile Manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.profileManager = new ProfileManager();
});
