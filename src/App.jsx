import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// Dummy Data
const emotionsData = {
  sad: {
    name: 'Sad',
    color: '#4A5568',
    bgColor: 'from-slate-700 via-blue-900 to-slate-800',
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
    animation: 'rain'
  },
  anxious: {
    name: 'Anxious',
    color: '#D97706',
    bgColor: 'from-orange-600 via-amber-700 to-yellow-800',
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
    animation: 'waves'
  },
  helpless: {
    name: 'Helpless',
    color: '#6B7280',
    bgColor: 'from-gray-700 via-slate-800 to-gray-900',
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
    animation: 'fog'
  },
  unfocused: {
    name: 'Unfocused',
    color: '#8B5CF6',
    bgColor: 'from-purple-600 via-indigo-700 to-violet-800',
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
    animation: 'scatter'
  },
  happy: {
    name: 'Happy',
    color: '#10B981',
    bgColor: 'from-emerald-500 via-green-600 to-teal-700',
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
    animation: 'bubbles'
  },
  calm: {
    name: 'Calm',
    color: '#3B82F6',
    bgColor: 'from-cyan-600 via-blue-700 to-teal-800',
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
    animation: 'breath'
  }
};

// Rain Animation for Sad
const RainAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const raindrops = [];
    for (let i = 0; i < 150; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${drop.opacity})`;
        ctx.lineWidth = 1;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();
        
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// Waves Animation for Anxious
const WavesAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(252, 211, 77, ${0.3 - i * 0.05})`;
        ctx.lineWidth = 2;
        
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + Math.sin(x * 0.01 + time + i * 0.5) * (30 + i * 20);
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      time += 0.03;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// Fog Animation for Helpless
const FogAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fogParticles = [];
    for (let i = 0; i < 80; i++) {
      fogParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.05
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      fogParticles.forEach(particle => {
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        gradient.addColorStop(0, `rgba(156, 163, 175, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(156, 163, 175, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          particle.x - particle.radius,
          particle.y - particle.radius,
          particle.radius * 2,
          particle.radius * 2
        );
        
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// Scatter Animation for Unfocused
const ScatterAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: canvas.width / 2,
        targetY: canvas.height / 2,
        size: Math.random() * 4 + 2,
        color: `rgba(167, 139, 250, ${Math.random() * 0.5 + 0.3})`,
        speed: Math.random() * 2 + 1
      });
    }

    let organizing = false;
    let timer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      timer++;
      if (timer % 200 === 0) {
        organizing = !organizing;
        if (!organizing) {
          particles.forEach(p => {
            p.targetX = Math.random() * canvas.width;
            p.targetY = Math.random() * canvas.height;
          });
        } else {
          particles.forEach((p, idx) => {
            const angle = (idx / particles.length) * Math.PI * 2;
            const radius = 100;
            p.targetX = canvas.width / 2 + Math.cos(angle) * radius;
            p.targetY = canvas.height / 2 + Math.sin(angle) * radius;
          });
        }
      }

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        particle.x += dx * 0.02;
        particle.y += dy * 0.02;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// Bubbles Animation for Happy
const BubblesAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const bubbles = [];
    for (let i = 0; i < 50; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        radius: Math.random() * 30 + 10,
        speed: Math.random() * 1.5 + 0.5,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01,
        opacity: Math.random() * 0.4 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(bubble => {
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.radius * 0.3,
          bubble.y - bubble.radius * 0.3,
          bubble.radius * 0.1,
          bubble.x,
          bubble.y,
          bubble.radius
        );
        gradient.addColorStop(0, `rgba(110, 231, 183, ${bubble.opacity + 0.2})`);
        gradient.addColorStop(0.5, `rgba(110, 231, 183, ${bubble.opacity})`);
        gradient.addColorStop(1, `rgba(52, 211, 153, ${bubble.opacity * 0.5})`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        bubble.y -= bubble.speed;
        bubble.wobble += bubble.wobbleSpeed;
        bubble.x += Math.sin(bubble.wobble) * 0.5;
        
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// Breath Animation for Calm
const BreathAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let breathCycle = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const breathScale = Math.sin(breathCycle) * 0.3 + 0.7;
      
      for (let i = 0; i < 6; i++) {
        const radius = (50 + i * 30) * breathScale;
        const gradient = ctx.createRadialGradient(
          centerX, centerY, radius * 0.5,
          centerX, centerY, radius
        );
        gradient.addColorStop(0, `rgba(103, 232, 249, ${0.15 - i * 0.02})`);
        gradient.addColorStop(1, 'rgba(103, 232, 249, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      breathCycle += 0.015;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
};

// Animation Selector
const AnimationBackground = ({ type }) => {
  switch (type) {
    case 'rain':
      return <RainAnimation />;
    case 'waves':
      return <WavesAnimation />;
    case 'fog':
      return <FogAnimation />;
    case 'scatter':
      return <ScatterAnimation />;
    case 'bubbles':
      return <BubblesAnimation />;
    case 'breath':
      return <BreathAnimation />;
    default:
      return null;
  }
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
      <div className={`min-h-screen bg-gradient-to-br ${data.bgColor} flex items-center justify-center p-8 relative overflow-hidden`}>
        <AnimationBackground type={data.animation} />
        
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-3 transition-all z-20 shadow-lg"
          title="Close"
        >
          <X size={28} />
        </button>

        <button
          onClick={handleClose}
          className="absolute top-6 left-6 text-white bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl px-6 py-3 transition-all z-20 shadow-lg font-semibold"
        >
          ← Back to Emotions
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