/* ============================================
   CHATBOT - STUDY ASSISTANT
   ============================================ */

class StudyAssistant {
  constructor() {
    this.fabBtn = document.getElementById('fabBtn');
    this.chatbotContainer = document.getElementById('chatbotContainer');
    this.messagesDiv = document.getElementById('chatbotMessages');
    this.chatInput = document.getElementById('chatInput');
    this.sendBtn = document.getElementById('sendBtn');
    this.closeBtn = document.getElementById('closeChatbot');
    this.quickBtns = document.querySelectorAll('.quick-btn');

    this.init();
  }

  init() {
    // FAB button to open chatbot
    if (this.fabBtn) {
      this.fabBtn.addEventListener('click', () => this.toggleChatbot());
    }

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeChatbot());
    }

    // Send button
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.sendMessage());
    }

    // Chat input - send on Enter
    if (this.chatInput) {
      this.chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendMessage();
        }
      });
    }

    // Quick buttons
    this.quickBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        this.handleQuickAction(action);
      });
    });

    // Close chatbot when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.chatbotContainer.contains(e.target) && 
          !this.fabBtn.contains(e.target) && 
          this.chatbotContainer.classList.contains('active')) {
        this.closeChatbot();
      }
    });
  }

  toggleChatbot() {
    if (this.chatbotContainer.classList.contains('active')) {
      this.closeChatbot();
    } else {
      this.openChatbot();
    }
  }

  openChatbot() {
    this.chatbotContainer.classList.add('active');
    this.chatInput.focus();
  }

  closeChatbot() {
    this.chatbotContainer.classList.remove('active');
    this.chatInput.blur();
  }

  addMessage(text, sender = 'bot') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender === 'bot' ? 'bot-message' : 'user-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    messageDiv.appendChild(contentDiv);
    this.messagesDiv.appendChild(messageDiv);
    
    // Auto scroll to latest message
    setTimeout(() => {
      this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
    }, 0);
  }

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    this.chatInput.value = '';

    // Process message and send response
    setTimeout(() => {
      const response = this.generateResponse(message.toLowerCase());
      this.addMessage(response, 'bot');
    }, 600);
  }

  handleQuickAction(action) {
    const actions = {
      quiz: {
        text: 'I want to take a Quiz',
        response: '📝 Great! I\'ll help you take a quiz. You can choose from various topics and difficulty levels. Click on "Browse Subjects" to get started, or I\'ll take you to the Quiz section directly.',
        url: 'quiz.html'
      },
      puzzle: {
        text: 'I want to solve a Puzzle',
        response: '🧩 Excellent! Puzzles are a fun way to improve your problem-solving skills. Let me take you to the Puzzle section where you can solve various challenges.',
        url: 'puzzle.html'
      },
      subjects: {
        text: 'I want to browse Subjects',
        response: '📚 Perfect! Browse through our collection of subjects organized by class and topic. Each subject has interactive lessons and practice exercises to boost your learning.',
        url: 'subjects.html'
      },
      gallery: {
        text: 'I want to view the Gallery',
        response: '🖼️ Great! Our gallery showcases educational images, diagrams, and visual learning materials. This is perfect for visual learners!',
        url: 'gallery.html'
      },
      rapidfire: {
        text: 'I want to try Rapid Fire',
        response: '⚡ Amazing choice! Rapid Fire is a fast-paced quiz format that tests your knowledge with quick questions. It\'s fun and challenging!',
        url: 'rapidfire.html'
      },
      camera: {
        text: 'I want to use Camera',
        response: '📷 Great! The camera feature allows you to capture and annotate images for your studies. Perfect for creating notes and sharing with classmates!',
        url: 'camera.html'
      }
    };

    const action_data = actions[action];
    if (action_data) {
      this.addMessage(action_data.text, 'user');
      setTimeout(() => {
        this.addMessage(action_data.response, 'bot');
        
        // Ask if they want to navigate
        setTimeout(() => {
          const navBtn = document.createElement('button');
          navBtn.className = 'quick-btn';
          navBtn.style.width = '100%';
          navBtn.style.marginTop = '0.5rem';
          navBtn.textContent = `✓ Take me to ${action.charAt(0).toUpperCase() + action.slice(1)}`;
          navBtn.addEventListener('click', () => {
            window.location.href = action_data.url;
          });
          
          const messageDiv = document.createElement('div');
          messageDiv.className = 'chat-message bot-message';
          messageDiv.appendChild(navBtn);
          this.messagesDiv.appendChild(messageDiv);
          
          this.messagesDiv.scrollTop = this.messagesDiv.scrollHeight;
        }, 800);
      }, 600);
    }
  }

  generateResponse(message) {
    const responses = {
      // Navigation queries
      'quiz': '📝 Want to take a quiz? I can help you navigate to the Quiz section. Just click the "Take Quiz" button above!',
      'puzzle': '🧩 Looking for puzzles? Great for brain training! Let me take you to the Puzzle section.',
      'subject': '📚 Interested in subjects? Browse through all available subjects and topics to learn more.',
      'gallery': '🖼️ Want to see images? Check out our gallery with educational images and diagrams.',
      'rapid': '⚡ Rapid Fire is an exciting quiz format. Quick questions, quick answers!',
      'camera': '📷 The camera feature helps you capture and annotate images for your studies.',
      
      // Help queries
      'help': '👋 I\'m here to help! You can:\n• Choose from Quick Action buttons\n• Type your question\n• Navigate to different learning modules\n• Get tips on how to use features\n\nWhat would you like to do?',
      'how': '📖 I can guide you through:\n• Taking quizzes and puzzles\n• Browsing subjects\n• Using the camera feature\n• Accessing your learning materials\n\nWhat do you need help with?',
      'guide': '🗺️ Let me guide you! Choose a Quick Action above, and I\'ll help you navigate to that section with tips on how to use it.',
      
      // Feature questions
      'quiz work': '📝 Quizzes test your knowledge on different topics. You can select difficulty levels and get instant feedback!',
      'puzzle work': '🧩 Puzzles are interactive challenges that improve problem-solving. Solve them to earn points!',
      'subject work': '📚 Subjects contain organized lessons by class and topic with interactive content and practice exercises.',
      'camera work': '📷 Use camera to capture images, add annotations, and create visual notes for your studies.',
      'gallery work': '🖼️ The gallery displays educational images, diagrams, and visual aids for better understanding.',
      'rapid work': '⚡ Rapid Fire is a timed quiz format with quick questions. Answer fast to get higher scores!',
      
      // Motivation & General Help
      'hello': '👋 Hi there! Welcome to BloomED. How can I help you learn better today?',
      'hi': '👋 Hi! Ready to learn? I can help you navigate to any learning activity. What interests you?',
      'hi there': '👋 Hey! Great to see you! Let\'s make today\'s learning session productive. Where would you like to go?',
      
      'stuck': '💡 Don\'t worry! Try:\n• Clicking on a Quick Action button\n• Checking the navigation menu\n• Browsing different subjects\n• Taking a break and coming back\n\nI\'m here to help!',
      'lost': '🗺️ No worries! I can guide you. What would you like to learn or do? Try any of the Quick Action buttons above!',
      
      'settings': '⚙️ You can access settings from the settings icon in the top right corner to adjust theme and language preferences.',
      'profile': '👤 Your profile is in the top right corner. Click the profile icon to see your details and logout when needed.',
      'theme': '🎨 You can change the theme (light/dark) from the header settings. Choose what\'s comfortable for you!',
      'language': '🌍 Multiple languages are supported! Click the language selector in the header to switch.',
    };

    // Check for exact or partial matches
    for (const [key, response] of Object.entries(responses)) {
      if (message.includes(key)) {
        return response;
      }
    }

    // Default response
    return '🤔 That\'s an interesting question! I can help you navigate to different learning activities. Try one of the Quick Action buttons above, or ask me about:\n• How to use features\n• Navigation help\n• Tips for learning\n\nWhat would you like to do?';
  }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new StudyAssistant();
});
