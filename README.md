# 📚 BloomED

A comprehensive, modern, and responsive learning management system built with **HTML5, CSS3, and Vanilla JavaScript**. Designed for students with an attractive UI, multiple themes, and educational games.

## ✨ Features

### 🎨 **Modern UI/UX**
- Clean and professional interface
- Smooth animations and transitions
- Glass morphism effects
- Responsive design for all devices
- Multiple premium themes

### 📱 **Responsive Design**
- Desktop (1920px+)
- Laptop (1440px-1919px)
- Tablet Landscape (900px-1023px)
- Tablet Portrait (768px-899px)
- Mobile Landscape (576px-767px)
- Mobile Portrait (320px-575px)
- Foldable devices support

### 🌐 **Multi-Language Support**
- English
- Tamil (தமிழ்)
- French (Français)
- Hindi (हिंदी)
- Instant language switching without page reload

### 🎨 **Theme System**
- **Light Theme** - Clean and simple
- **Dark Theme** - Easy on the eyes
- **School Theme** - Blue and yellow school colors
- **Nature Theme** - Green with nature animations
- **Space Theme** - Dark blue with twinkling stars
- **Cartoon Theme** - Bright and playful
- **Rainbow Theme** - Colorful gradient
- **High Contrast** - For accessibility
- LocalStorage persistence

### 🎮 **Educational Games**
- **Quiz** - Test knowledge with multiple-choice questions
- **Puzzle** - Solve different types of puzzles
- **Rapid Fire** - Quick-fire questions with timer
- Scoring system and leaderboard

### 📷 **Camera Integration**
- Front and rear camera support
- Photo capture and selfie
- Flash control
- Camera switching
- Photo download and save to gallery

### 🖼️ **Gallery Management**
- Masonry, Grid, and Timeline views
- Drag-and-drop upload
- Image filters
- Lightbox preview
- Zoom controls
- Image compression
- Favorite marking

### ⏰ **Reminder System**
- Add/edit/delete reminders
- Categorize reminders (Homework, Exam, Sports, etc.)
- Set priority levels
- Repeat options (Daily, Weekly, Monthly)
- Calendar view
- Notifications

### 👤 **User System**
- Login and registration
- Profile management
- Academic information
- Parent contact details
- Profile photo
- Password strength indicator

### ⚙️ **Settings**
- Theme customization
- Language selection
- Font size adjustment
- Animation toggle
- Sound control
- Notification settings
- Data backup and restore

### 💾 **Local Storage**
- User data persistence
- Reminders storage
- Gallery image storage
- Quiz scores tracking
- Achievements system
- Settings backup

### ♿ **Accessibility**
- Keyboard navigation
- ARIA labels
- Focus indicators
- High contrast mode
- Reduced motion support
- Screen reader friendly

## 📁 Folder Structure

```
SchoolPortal/
├── index.html              # Home/Dashboard
├── login.html              # Login & Sign Up
├── gallery.html            # Photo Gallery
├── camera.html             # Camera interface
├── quiz.html               # Quiz game
├── reminder.html           # Reminder management
├── settings.html           # Settings page
├── profile.html            # User profile
├── subjects.html           # Subject management
├── puzzle.html             # Puzzle game
├── rapidfire.html          # Rapid Fire game
│
├── css/
│   ├── main.css            # Main styles
│   ├── theme.css           # Theme colors
│   ├── animation.css       # Animations
│   ├── responsive.css      # Media queries
│   ├── gallery.css         # Gallery styles
│   ├── games.css           # Games styles
│   └── login.css           # Login styles
│
├── js/
│   ├── app.js              # Main application
│   ├── validation.js       # Form validation
│   ├── storage.js          # LocalStorage management
│   ├── utils.js            # Utility functions
│   ├── camera.js           # Camera functionality
│   ├── gallery.js          # Gallery functionality
│   ├── quiz.js             # Quiz game
│   ├── rapidfire.js        # Rapid Fire game
│   ├── puzzle.js           # Puzzle game
│   ├── reminder.js         # Reminder system
│   ├── router.js           # Router
│   └── search.js           # Search functionality
│
├── languages/
│   ├── english.json        # English translations
│   ├── tamil.json          # Tamil translations
│   ├── french.json         # French translations
│   └── hindi.json          # Hindi translations
│
└── assets/
    ├── images/             # Images
    ├── icons/              # Icons
    ├── animations/         # SVG animations
    └── audio/              # Sound files
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required
- All data stored locally in browser

### Installation

1. **Download or Clone the project**
```bash
git clone https://github.com/yourusername/smart-school-portal.git
cd SmartSchoolPortal
```

2. **Open in Browser**
   - Simply open `login.html` in your browser
   - Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   ```

3. **Access the Application**
   - Navigate to `http://localhost:8000` (or your server port)
   - Register a new account
   - Start learning!

## 🎯 Usage Guide

### Creating an Account
1. Open `login.html`
2. Click "Sign Up"
3. Fill in all required information
4. Upload a profile photo
5. Create a strong password
6. Click "Create Account"

### Taking Photos
1. Go to Camera from home
2. Click "Capture" to take a photo
3. Switch between front and rear camera
4. Toggle flash if needed
5. Save to gallery

### Managing Reminders
1. Go to Reminders
2. Click "Add Reminder"
3. Set title, date, time, and category
4. Choose priority and repeat options
5. Save reminder

### Playing Games
1. Go to Quiz, Puzzle, or Rapid Fire
2. Select a category
3. Answer questions
4. View your score
5. Try again or go home

### Changing Theme
1. Click theme selector in header
2. Choose from 7 different themes
3. Changes apply instantly
4. Settings are saved locally

### Changing Language
1. Click language selector in header
2. Choose from 4 languages
3. All text updates instantly
4. No page reload required

## 🛠️ Development

### Adding New Quiz Questions
Edit `js/quiz.js` and add questions to the `quizData` object:
```javascript
quizData.newCategory = [
  {
    question: "Your question?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0  // Index of correct answer
  }
];
```

### Adding New Languages
1. Create new JSON file in `languages/` directory
2. Follow the structure of existing language files
3. Update app.js to load the new language
4. Add option to language selector

### Customizing Themes
Edit `css/theme.css` to modify theme colors:
```css
:root.theme-newtheme {
  --primary-color: #yourcolor;
  --secondary-color: #yourcolor;
  /* ... more variables ... */
}
```

## 💾 Data Storage

All data is stored in **Browser LocalStorage**:
- `portal_user` - User account information
- `portal_reminders` - Reminders list
- `portal_gallery` - Gallery images (base64)
- `portal_quiz_scores` - Quiz scores
- `portal_achievements` - Unlocked achievements
- `portal_settings` - User preferences
- `portal_theme` - Current theme
- `portal_language` - Current language

### Backup & Restore
- Click "Backup Data" in Settings to download JSON
- Click "Restore Data" to upload previous backup
- All data is preserved across browser sessions

## 🔐 Security Notes

- **Passwords** are stored in plain text in localStorage (for demo purposes)
- In production, implement proper backend authentication
- Use HTTPS for all connections
- Sanitize all user inputs
- Implement proper access controls

## 📊 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Android Chrome)

## 🎮 Game Rules

### Quiz
- Multiple choice questions
- 60 seconds per question
- No time limit for entire quiz
- Score: Number of correct answers

### Puzzle
- Various puzzle types
- Difficulty levels
- Score based on speed

### Rapid Fire
- 30/60/120 second modes
- 3 lives system
- Questions appear rapidly
- Instant scoring

## 📚 Features for Future

- [ ] Backend API integration
- [ ] Real-time multiplayer games
- [ ] Video lessons
- [ ] Progress analytics
- [ ] Teacher management
- [ ] Class assignments
- [ ] Video conferencing
- [ ] Push notifications
- [ ] Offline support (PWA)
- [ ] Advanced achievements system

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📧 Support

For support, email support@smartschool.local or open an issue on GitHub.

## 🙏 Acknowledgments

- Inspired by Google Classroom, Duolingo, and Khan Academy Kids
- UI design principles from Material Design and Fluent Design
- Community feedback and suggestions

---

**Happy Learning! 🎓**

Made with ❤️ for students everywhere
