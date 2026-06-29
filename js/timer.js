/* ============================================
   TIMER MODULE
   ============================================ */

class SessionTimer {
  constructor() {
    this.startTime = Date.now();
    this.timerDisplay = document.getElementById('timerDisplay');
    this.init();
  }

  init() {
    // Start timer update
    this.updateTimer();
    setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    if (!this.timerDisplay) return;

    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    const hours = Math.floor(elapsed / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);
    const seconds = elapsed % 60;

    this.timerDisplay.textContent = 
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  reset() {
    this.startTime = Date.now();
  }
}

// Initialize timer when page loads
document.addEventListener('DOMContentLoaded', () => {
  window.sessionTimer = new SessionTimer();
});
