# 🧠 MindfulSpace - Emotional Wellness Companion

![MindfulSpace Banner](https://img.shields.io/badge/MindfulSpace-Emotional%20Wellness-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

> **Track, understand, and improve your emotional wellbeing with AI-powered insights**

MindfulSpace is a modern, beautifully designed emotional wellness application that helps users track their emotions, gain personalized insights, and build better mental health habits through science-backed techniques.

---

## ✨ Features

### 🎯 Core Features
- **Emotion Tracking** - Log your daily emotions with an intuitive, visual interface
- **AI-Powered Insights** - Get personalized recommendations based on your emotional patterns
- **Progress Analytics** - Beautiful charts and graphs to visualize your wellness journey
- **Mood Calendar** - Track your emotional trends over time
- **Achievement System** - Earn badges and milestones for consistency
- **Daily Quotes & Tips** - Motivational content tailored to your current emotion

### 🎨 Design Highlights
- **Modern UI/UX** - Clean, professional design with smooth animations
- **Dynamic Backgrounds** - Aesthetic particle systems and morphing gradients
- **Glass Morphism** - Contemporary frosted-glass card designs
- **Responsive Layout** - Fully optimized for mobile, tablet, and desktop
- **Accessible** - WCAG compliant with keyboard navigation support

### 🔐 Security & Privacy
- **Privacy First** - Your data is encrypted and never shared
- **Secure Authentication** - Protected login system
- **Local Storage** - Data stored securely on your device
- **No Third-Party Tracking** - Your wellness journey stays private

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindfulspace.git
   cd mindfulspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

---

## 📁 Project Structure

```
mindfulspace/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── BackgroundElements.jsx
│   │   │   └── homeStyles.js
│   │   ├── AnimationBackground.jsx
│   │   └── Footer.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── data/
│   │   └── emotionsData.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── utils/
│   │   └── navigation.js
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

---

## 🎨 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Lucide React** - Beautiful, customizable icons
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Animations** - CSS keyframes and transitions

### State Management
- **React Context API** - For authentication and global state
- **React Hooks** - useState, useEffect, useContext

### Styling
- **Tailwind CSS** - Responsive utility classes
- **Custom CSS Animations** - Particle systems, morphing blobs
- **Google Fonts** - Playfair Display, Outfit, Lora, Inter

---

## 🧩 Key Components

### HomePage
Landing page with features showcase and call-to-action. Auto-redirects authenticated users to dashboard.

### DashboardPage
Main application interface featuring:
- Emotion cards for quick logging
- Weekly mood trends chart
- Recent check-ins timeline
- Achievement badges
- AI-powered insights
- Quick action buttons

### LoginPage & RegisterPage
Secure authentication pages with:
- Form validation
- Password strength indicator
- Animated backgrounds
- Error handling

### EmotionModal
Interactive emotion detail view with:
- Curated quotes
- Actionable tips
- Beautiful animations
- Theme-matched colors

---

## 📊 Emotion Categories

MindfulSpace tracks 6+ primary emotions:
- 😊 **Happy** - Joy, contentment, gratitude
- 😢 **Sad** - Melancholy, grief, disappointment
- 😰 **Anxious** - Worry, stress, nervousness
- 😡 **Angry** - Frustration, irritation, rage
- 😌 **Calm** - Peace, relaxation, serenity
- 😴 **Tired** - Fatigue, exhaustion, low energy

Each emotion includes:
- Personalized quotes
- Actionable wellness tips
- Color-coded themes
- Custom animations

---

## 🎯 Usage Guide

### For First-Time Users

1. **Create an Account**
   - Click "Get Started Free" on the homepage
   - Fill in your details (no credit card required)
   - Verify your email (if applicable)

2. **Log Your First Emotion**
   - Navigate to the dashboard
   - Click on the emotion card that matches your current feeling
   - Read the personalized quote and tip
   - View your entry in the timeline

3. **Track Your Progress**
   - Check the weekly mood chart
   - View your check-in streak
   - Earn achievement badges
   - Read AI-generated insights

### For Returning Users

1. **Daily Check-in**
   - Log in to your dashboard
   - Select your current emotion
   - Review your progress

2. **Analyze Trends**
   - View weekly/monthly patterns
   - Identify triggers and improvements
   - Set wellness goals

---

## 🛠️ Customization

### Modify Emotions Data
Edit `src/data/emotionsData.js` to customize:
- Emotion names and icons
- Color themes
- Quotes and tips
- Animation types

### Change Color Scheme
Update Tailwind classes in components:
```javascript
// Current theme: Amber/Orange/Rose
from-amber-50 via-orange-50 to-rose-50

// Change to your theme:
from-blue-50 via-purple-50 to-pink-50
```

### Add New Features
1. Create component in `src/components/`
2. Import in relevant page
3. Add routing if needed
4. Update context for state management

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

---

## 🐛 Known Issues

- None currently reported
---

## 🙏 Acknowledgments

- **Design Inspiration** - Modern wellness apps and Dribbble designs
- **Icons** - [Lucide Icons](https://lucide.dev)
- **Fonts** - Google Fonts (Playfair Display, Outfit, Lora, Inter)
- **Color Palette** - Tailwind CSS default colors
- **Animation Ideas** - CodePen community

---


## 🌟 Show Your Support

If MindfulSpace helped you on your wellness journey, please consider:

- ⭐ **Star this repository**
- 🐦 **Share on social media**
- 🤝 **Contribute to the project**
- 💬 **Spread the word**

---

<div align="center">

**Made with ❤️ for better mental health**

[⬆ Back to Top](#-mindfulspace---emotional-wellness-companion)

</div>