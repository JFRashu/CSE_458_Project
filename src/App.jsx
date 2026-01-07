// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import React, { useState } from 'react';
import { X } from 'lucide-react';

// Dummy Data
const emotionsData = {
  sad: {
    name: 'Sad',
    color: '#4A5568',
    bgColor: 'from-gray-600 to-blue-800',
    quotes: [
      "It's okay to feel sad. This feeling will pass, and brighter days are ahead.",
      "Your feelings are valid. Be gentle with yourself during difficult times.",
      "Even the darkest night will end and the sun will rise."
    ],
    tips: [
      "Take slow, deep breaths for 2 minutes",
      "Write down three things you're grateful for",
      "Reach out to a friend or loved one"
    ],
    particles: { count: 100, speed: 0.5, color: '#93C5FD' }
  },
  anxious: {
    name: 'Anxious',
    color: '#D97706',
    bgColor: 'from-orange-400 to-yellow-600',
    quotes: [
      "You are stronger than your anxiety. Take one moment at a time.",
      "Worrying does not take away tomorrow's troubles, it takes away today's peace.",
      "This too shall pass. You've overcome challenges before."
    ],
    tips: [
      "Practice the 5-4-3-2-1 grounding technique",
      "Focus on what you can control right now",
      "Take a short walk outside if possible"
    ],
    particles: { count: 150, speed: 1.2, color: '#FCD34D' }
  },
  helpless: {
    name: 'Helpless',
    color: '#6B7280',
    bgColor: 'from-gray-500 to-gray-700',
    quotes: [
      "You are not alone. Small steps forward are still progress.",
      "Every ending is a new beginning. You have the strength within you.",
      "It's okay to ask for help. Reaching out is a sign of courage."
    ],
    tips: [
      "Break your challenges into smaller, manageable steps",
      "Remember past difficulties you've overcome",
      "Connect with a support system or counselor"
    ],
    particles: { count: 80, speed: 0.3, color: '#9CA3AF' }
  },
  unfocused: {
    name: 'Unfocused',
    color: '#8B5CF6',
    bgColor: 'from-purple-400 to-indigo-600',
    quotes: [
      "Clear your mind, one task at a time. You've got this.",
      "Progress, not perfection. Focus on what matters most right now.",
      "Take a break when needed. Your mind deserves rest too."
    ],
    tips: [
      "Try the Pomodoro technique: 25 minutes focus, 5 minutes break",
      "Remove distractions from your environment",
      "Start with the easiest task to build momentum"
    ],
    particles: { count: 120, speed: 0.8, color: '#A78BFA' }
  },
  happy: {
    name: 'Happy',
    color: '#10B981',
    bgColor: 'from-green-400 to-emerald-600',
    quotes: [
      "Your joy is contagious. Share your light with the world.",
      "Celebrate this moment. You deserve all the happiness you feel.",
      "Happiness looks good on you. Keep spreading those positive vibes!"
    ],
    tips: [
      "Share your happiness with someone you care about",
      "Write down what made you happy today",
      "Take a moment to savor this feeling"
    ],
    particles: { count: 200, speed: 1.0, color: '#6EE7B7' }
  },
  calm: {
    name: 'Calm',
    color: '#3B82F6',
    bgColor: 'from-blue-300 to-teal-500',
    quotes: [
      "Peace begins with a smile and a deep breath.",
      "In the midst of movement and chaos, keep stillness inside of you.",
      "You are exactly where you need to be. Breathe and be present."
    ],
    tips: [
      "Practice mindful breathing for 3 minutes",
      "Observe your surroundings without judgment",
      "Enjoy this peaceful moment fully"
    ],
    particles: { count: 60, speed: 0.4, color: '#67E8F9' }
  }
};

// Particle Animation Component
const ParticleBackground = ({ emotion }) => {
  const particleConfig = emotionsData[emotion].particles;
  const particles = Array.from({ length: particleConfig.count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particleConfig.color,
            animation: `float ${10 / particleConfig.speed}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};

// Main App Component
const App = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    setCurrentQuoteIndex(Math.floor(Math.random() * emotionsData[emotion].quotes.length));
  };

  const handleClose = () => {
    setSelectedEmotion(null);
  };

  if (selectedEmotion) {
    const data = emotionsData[selectedEmotion];
    const quote = data.quotes[currentQuoteIndex];
    const tip = data.tips[currentQuoteIndex];

    return (
      <div className={`min-h-screen bg-gradient-to-br ${data.bgColor} flex items-center justify-center p-8 relative`}>
        <ParticleBackground emotion={selectedEmotion} />
        
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all z-10"
        >
          <X size={28} />
        </button>

        <div className="max-w-2xl w-full bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 shadow-2xl z-10">
          <div className="text-center mb-8">
            <h2 className="text-5xl font-bold text-white mb-2">{data.name}</h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full opacity-60"></div>
          </div>

          <div className="bg-white bg-opacity-20 rounded-2xl p-8 mb-6">
            <p className="text-2xl text-white font-light leading-relaxed italic">
              "{quote}"
            </p>
          </div>

          <div className="bg-white bg-opacity-20 rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Try This:</h3>
            <p className="text-lg text-white leading-relaxed">
              {tip}
            </p>
          </div>

          <button
            onClick={() => setCurrentQuoteIndex((currentQuoteIndex + 1) % data.quotes.length)}
            className="mt-6 w-full bg-white bg-opacity-30 hover:bg-opacity-40 text-white font-semibold py-4 rounded-xl transition-all"
          >
            Get Another Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">How are you feeling today?</h1>
        <p className="text-xl text-white opacity-80">Select an emotion to get support and guidance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {Object.entries(emotionsData).map(([key, emotion]) => (
          <button
            key={key}
            onClick={() => handleEmotionSelect(key)}
            className="group relative overflow-hidden bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 rounded-2xl p-8 transition-all transform hover:scale-105 hover:shadow-2xl"
            style={{ borderColor: emotion.color, borderWidth: '2px' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: emotion.color }}
            />
            <h3 className="text-2xl font-bold text-white relative z-10">{emotion.name}</h3>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center text-white opacity-60 text-sm">
        <p>Remember: It's okay to not be okay. Your feelings are valid.</p>
      </div>
    </div>
  );
};

export default App;
