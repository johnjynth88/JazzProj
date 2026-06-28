/* ============================================
   LOCAL STORAGE MANAGEMENT
   ============================================ */

class StorageManager {
  static setUser(userData) {
    localStorage.setItem('portal_user', JSON.stringify(userData));
  }

  static getUser() {
    const user = localStorage.getItem('portal_user');
    return user ? JSON.parse(user) : null;
  }

  static removeUser() {
    localStorage.removeItem('portal_user');
  }

  static setTheme(theme) {
    localStorage.setItem('portal_theme', theme);
  }

  static getTheme() {
    return localStorage.getItem('portal_theme') || 'light';
  }

  static setLanguage(language) {
    localStorage.setItem('portal_language', language);
  }

  static getLanguage() {
    return localStorage.getItem('portal_language') || 'english';
  }

  static addReminder(reminder) {
    const reminders = this.getReminders();
    reminder.id = Date.now();
    reminders.push(reminder);
    localStorage.setItem('portal_reminders', JSON.stringify(reminders));
    return reminder;
  }

  static getReminders() {
    const reminders = localStorage.getItem('portal_reminders');
    return reminders ? JSON.parse(reminders) : [];
  }

  static updateReminder(id, reminder) {
    const reminders = this.getReminders();
    const index = reminders.findIndex(r => r.id === id);
    if (index !== -1) {
      reminders[index] = { ...reminders[index], ...reminder };
      localStorage.setItem('portal_reminders', JSON.stringify(reminders));
    }
  }

  static deleteReminder(id) {
    const reminders = this.getReminders();
    const filtered = reminders.filter(r => r.id !== id);
    localStorage.setItem('portal_reminders', JSON.stringify(filtered));
  }

  static addGalleryImage(image) {
    const images = this.getGalleryImages();
    image.id = Date.now();
    images.push(image);
    localStorage.setItem('portal_gallery', JSON.stringify(images));
    return image;
  }

  static getGalleryImages() {
    const images = localStorage.getItem('portal_gallery');
    return images ? JSON.parse(images) : [];
  }

  static deleteGalleryImage(id) {
    const images = this.getGalleryImages();
    const filtered = images.filter(img => img.id !== id);
    localStorage.setItem('portal_gallery', JSON.stringify(filtered));
  }

  static addQuizScore(score) {
    const scores = this.getQuizScores();
    score.date = new Date().toISOString();
    scores.push(score);
    localStorage.setItem('portal_quiz_scores', JSON.stringify(scores));
  }

  static getQuizScores() {
    const scores = localStorage.getItem('portal_quiz_scores');
    return scores ? JSON.parse(scores) : [];
  }

  static addAchievement(achievement) {
    const achievements = this.getAchievements();
    achievement.unlockedDate = new Date().toISOString();
    achievements.push(achievement);
    localStorage.setItem('portal_achievements', JSON.stringify(achievements));
  }

  static getAchievements() {
    const achievements = localStorage.getItem('portal_achievements');
    return achievements ? JSON.parse(achievements) : [];
  }

  static setSettings(settings) {
    localStorage.setItem('portal_settings', JSON.stringify(settings));
  }

  static getSettings() {
    const settings = localStorage.getItem('portal_settings');
    return settings ? JSON.parse(settings) : {};
  }

  static clearAll() {
    localStorage.clear();
  }

  static exportData() {
    const data = {
      user: this.getUser(),
      reminders: this.getReminders(),
      gallery: this.getGalleryImages(),
      quizScores: this.getQuizScores(),
      achievements: this.getAchievements(),
      settings: this.getSettings(),
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `school-portal-backup-${Date.now()}.json`;
    link.click();
  }

  static importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.user) localStorage.setItem('portal_user', JSON.stringify(data.user));
          if (data.reminders) localStorage.setItem('portal_reminders', JSON.stringify(data.reminders));
          if (data.gallery) localStorage.setItem('portal_gallery', JSON.stringify(data.gallery));
          if (data.quizScores) localStorage.setItem('portal_quiz_scores', JSON.stringify(data.quizScores));
          if (data.achievements) localStorage.setItem('portal_achievements', JSON.stringify(data.achievements));
          if (data.settings) localStorage.setItem('portal_settings', JSON.stringify(data.settings));
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  }
}
