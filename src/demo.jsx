import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { X, Heart, Cloud, Sparkles, Wind, Sun, Waves, Menu, LogOut, User, Activity, Calendar, TrendingUp, Award } from 'lucide-react';

// ========== CONTEXT ==========
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    if (email && password) {
      setUser({ email, name: email.split('@')[0] });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = (email, password, name) => {
    if (email && password && name) {
      setUser({ email, name });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// ========== ROUTER SIMULATION ==========
const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');
  
  useEffect(() => {
    window.setCurrentPath = setCurrentPath;
  }, []);

  const navigate = (path) => setCurrentPath(path);

  return React.Children.map(children, child => 
    React.cloneElement(child, { currentPath, navigate })
  );
};

const Route = ({ path, component: Component, currentPath, navigate }) => {
  return currentPath === path ? <Component navigate={navigate} /> : null;
};

// ========== EMOTIONS DATA ==========
const emotionsData = {
  sad: {
    name: 'Sad',
    icon: Cloud,
    color: '#4A5568',
    accentColor: '#60A5FA',
    bgColor: 'from-slate-900 via-blue-900 to-indigo-900',
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
    icon: Wind,
    color: '#D97706',
    accentColor: '#FBBF24',
    bgColor: 'from-orange-900 via-amber-800 to-yellow-900',
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
    animation: 'storm'
  },
  helpless: {
    name: 'Helpless',
    icon: Cloud,
    color: '#6B7280',
    accentColor: '#9CA3AF',
    bgColor: 'from-gray-900 via-slate-800 to-zinc-900',
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
    animation: 'aurora'
  },
  unfocused: {
    name: 'Unfocused',
    icon: Sparkles,
    color: '#8B5CF6',
    accentColor: '#A78BFA',
    bgColor: 'from-purple-900 via-indigo-900 to-violet-900',
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
    animation: 'galaxy'
  },
  happy: {
    name: 'Happy',
    icon: Sun,
    color: '#10B981',
    accentColor: '#34D399',
    bgColor: 'from-emerald-900 via-green-800 to-teal-900',
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
    animation: 'fireflies'
  },
  calm: {
    name: 'Calm',
    icon: Waves,
    color: '#3B82F6',
    accentColor: '#60A5FA',
    bgColor: 'from-cyan-900 via-blue-900 to-teal-900',
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
    animation: 'ocean'
  }
};

// ========== ANIMATIONS ==========

// Rain Animation
const RainAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const raindrops = [];
    for (let i = 0; i < 200; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 25 + 15,
        speed: Math.random() * 4 + 3,
        opacity: Math.random() * 0.6 + 0.3
      });
    }

    const ripples = [];
    let lightning = { active: false, x: 0, opacity: 0, branches: [] };

    const createLightning = () => {
      lightning.x = Math.random() * canvas.width;
      lightning.opacity = 1;
      lightning.active = true;
      lightning.branches = [];
      
      let currentX = lightning.x;
      let currentY = 0;
      
      for (let i = 0; i < 15; i++) {
        const nextX = currentX + (Math.random() - 0.5) * 60;
        const nextY = currentY + Math.random() * 40 + 30;
        lightning.branches.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });
        currentX = nextX;
        currentY = nextY;
      }
    };

    let lightningTimer = Math.random() * 200 + 100;

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (lightning.active) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#60A5FA';
        ctx.strokeStyle = `rgba(147, 197, 253, ${lightning.opacity})`;
        ctx.lineWidth = 3;
        lightning.branches.forEach(branch => {
          ctx.beginPath();
          ctx.moveTo(branch.x1, branch.y1);
          ctx.lineTo(branch.x2, branch.y2);
          ctx.stroke();
        });
        ctx.shadowBlur = 0;
        lightning.opacity -= 0.05;
        if (lightning.opacity <= 0) lightning.active = false;
      }

      raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${drop.opacity})`;
        ctx.lineWidth = 2;
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 3, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
          ripples.push({ x: drop.x, y: canvas.height - 50, radius: 0, opacity: 1 });
        }
      });

      ripples.forEach((ripple, index) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 197, 253, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        ripple.radius += 2;
        ripple.opacity -= 0.02;
        if (ripple.opacity <= 0) ripples.splice(index, 1);
      });

      lightningTimer--;
      if (lightningTimer <= 0) {
        createLightning();
        lightningTimer = Math.random() * 300 + 150;
      }

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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Storm Animation
const StormAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 300; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 200 + 100,
        speed: Math.random() * 0.02 + 0.01,
        size: Math.random() * 3 + 1,
        centerX: canvas.width / 2,
        centerY: canvas.height / 2
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(20, 20, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.angle += particle.speed;
        particle.x = particle.centerX + Math.cos(particle.angle) * particle.radius;
        particle.y = particle.centerY + Math.sin(particle.angle) * particle.radius;

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, 'rgba(251, 191, 36, 0.8)');
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();

        particle.radius += Math.sin(particle.angle * 2) * 0.5;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Aurora Animation
const AuroraAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const waves = [
      { color: 'rgba(134, 239, 172, 0.3)', offset: 0, speed: 0.02 },
      { color: 'rgba(96, 165, 250, 0.3)', offset: Math.PI / 3, speed: 0.015 },
      { color: 'rgba(167, 139, 250, 0.3)', offset: Math.PI / 1.5, speed: 0.025 }
    ];

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waves.forEach(wave => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + 
            Math.sin(x * 0.005 + time + wave.offset) * 100 + 
            Math.sin(x * 0.01 + time * 1.5) * 50;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();

        time += wave.speed;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Galaxy Animation
const GalaxyAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 500; i++) {
      stars.push({
        angle: Math.random() * Math.PI * 2,
        distance: Math.random() * 400,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.001 + 0.0005,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.05 + 0.02
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach(star => {
        star.angle += star.speed;
        star.twinkle += star.twinkleSpeed;

        const x = centerX + Math.cos(star.angle) * star.distance;
        const y = centerY + Math.sin(star.angle) * star.distance;
        const brightness = (Math.sin(star.twinkle) + 1) / 2;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 3);
        gradient.addColorStop(0, `rgba(167, 139, 250, ${brightness})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${brightness * 0.5})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(167, 139, 250, ${brightness * 0.3})`;
        ctx.lineWidth = star.size;
        ctx.beginPath();
        const prevX = centerX + Math.cos(star.angle - 0.1) * star.distance;
        const prevY = centerY + Math.sin(star.angle - 0.1) * star.distance;
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.stroke();
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Fireflies Animation
const FirefliesAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireflies = [];
    for (let i = 0; i < 100; i++) {
      fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        brightness: Math.random(),
        brightnessSpeed: Math.random() * 0.05 + 0.02,
        size: Math.random() * 4 + 2,
        hue: Math.random() * 60 + 60
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach(firefly => {
        firefly.brightness += firefly.brightnessSpeed;
        if (firefly.brightness > Math.PI * 2) firefly.brightness = 0;

        const glow = (Math.sin(firefly.brightness) + 1) / 2;

        ctx.shadowBlur = 20 * glow;
        ctx.shadowColor = `hsl(${firefly.hue}, 100%, 60%)`;

        const gradient = ctx.createRadialGradient(
          firefly.x, firefly.y, 0,
          firefly.x, firefly.y, firefly.size * 4
        );
        gradient.addColorStop(0, `hsla(${firefly.hue}, 100%, 70%, ${glow})`);
        gradient.addColorStop(0.5, `hsla(${firefly.hue}, 100%, 50%, ${glow * 0.5})`);
        gradient.addColorStop(1, 'rgba(52, 211, 153, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(firefly.x, firefly.y, firefly.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0;

        firefly.x += firefly.vx;
        firefly.y += firefly.vy;

        if (firefly.x < 0 || firefly.x > canvas.width) firefly.vx *= -1;
        if (firefly.y < 0 || firefly.y > canvas.height) firefly.vy *= -1;

        firefly.vx += (Math.random() - 0.5) * 0.1;
        firefly.vy += (Math.random() - 0.5) * 0.1;
        firefly.vx *= 0.99;
        firefly.vy *= 0.99;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

// Ocean Animation
const OceanAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 47, 73, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let layer = 0; layer < 8; layer++) {
        ctx.beginPath();
        const waveHeight = 60 + layer * 15;
        const baseY = canvas.height - 200 + layer * 25;

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = baseY + 
            Math.sin(x * 0.01 + time + layer * 0.5) * waveHeight * 0.3 + 
            Math.sin(x * 0.005 + time * 0.7) * waveHeight * 0.2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const opacity = 0.15 - layer * 0.015;
        ctx.fillStyle = `rgba(96, 165, 250, ${opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < 20; i++) {
        const x = (time * 50 + i * 100) % canvas.width;
        const y = canvas.height - 180 + Math.sin(time + i) * 20;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.02;
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

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};



// Animation Selector
const AnimationBackground = ({ type }) => {
  switch (type) {
    case 'rain': return <RainAnimation />;
    case 'storm': return <StormAnimation />;
    case 'aurora': return <AuroraAnimation />;
    case 'galaxy': return <GalaxyAnimation />;
    case 'fireflies': return <FirefliesAnimation />;
    case 'ocean': return <OceanAnimation />;
    default: return null;
  }
};

// ========== NAVBAR COMPONENT ==========
const Navbar = ({ navigate }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Heart className="text-pink-400 mr-2" size={28} />
            <span className="text-white font-bold text-xl">MindfulSpace</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-white hover:text-pink-400 px-3 py-2 rounded-lg transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="text-white hover:text-pink-400 px-3 py-2 rounded-lg transition-colors"
                >
                  Emotions
                </button>
                <div className="flex items-center space-x-3 pl-3 border-l border-white/20">
                  <span className="text-white text-sm">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-white hover:text-pink-400 px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                  className="block w-full text-left text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { navigate('/'); setIsOpen(false); }}
                  className="block w-full text-left text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                  Emotions
                </button>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-white text-sm px-3 py-2">Hi, {user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500/20 text-red-300 px-3 py-2 rounded-lg flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="block w-full text-left text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/register'); setIsOpen(false); }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-2 rounded-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// ========== LOGIN PAGE ==========
const LoginPage = ({ navigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 pt-20">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full mb-4">
            <Heart className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/70">Login to continue your wellness journey</p>
        </div>

        <div className="space-y-4" onKeyPress={handleKeyPress}>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Login
          </button>
        </div>

        <p className="text-center text-white/70 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-pink-400 hover:text-pink-300 font-semibold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

// ========== REGISTER PAGE ==========
const RegisterPage = ({ navigate }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (register(email, password, name)) {
      navigate('/dashboard');
    } else {
      setError('Registration failed');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 pt-20">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full mb-4">
            <User className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/70">Start your wellness journey today</p>
        </div>

        <div className="space-y-4" onKeyPress={handleKeyPress}>
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white mb-2 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-white mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-white/70 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-pink-400 hover:text-pink-300 font-semibold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

// ========== DASHBOARD PAGE ==========
const DashboardPage = ({ navigate }) => {
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const stats = [
    { icon: Activity, label: 'Check-ins', value: '24', color: 'from-pink-500 to-rose-500' },
    { icon: Calendar, label: 'Streak', value: '7 days', color: 'from-purple-500 to-indigo-500' },
    { icon: TrendingUp, label: 'Improvement', value: '+15%', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Achievements', value: '5', color: 'from-emerald-500 to-green-500' }
  ];

  const recentEmotions = [
    { emotion: 'Happy', time: '2 hours ago', icon: Sun, color: 'text-green-400' },
    { emotion: 'Calm', time: '5 hours ago', icon: Waves, color: 'text-blue-400' },
    { emotion: 'Anxious', time: 'Yesterday', icon: Wind, color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-white/70 text-lg">Here's your wellness overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-white/70 text-sm mb-1">{stat.label}</p>
                <p className="text-white text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Check-ins</h2>
            <div className="space-y-4">
              {recentEmotions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                    <Icon className={item.color} size={32} />
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.emotion}</p>
                      <p className="text-white/60 text-sm">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg transform hover:scale-[1.02]"
              >
                Check Your Emotions
              </button>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-4 rounded-xl transition-all border border-white/20">
                View Progress
              </button>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-4 rounded-xl transition-all border border-white/20">
                Set Goals
              </button>
            </div>
          </div>
        </div>

        {/* Mood Insight */}
        <div className="mt-6 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30">
          <h3 className="text-xl font-bold text-white mb-2">💡 Today's Insight</h3>
          <p className="text-white/90">
            You've been consistently checking in for 7 days! Your emotional awareness is improving. 
            Keep up the great work on your wellness journey!
          </p>
        </div>
      </div>
    </div>
  );
};

// ========== HOME PAGE (EMOTIONS) ==========
const HomePage = ({ navigate }) => {
  const { isAuthenticated } = useAuth();
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [stars] = useState(() => 
    [...Array(50)].map(() => ({
      width: Math.random() * 10 + 2,
      height: Math.random() * 10 + 2,
      top: Math.random() * 100,
      left: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.7 + 0.3
    }))
  );

  const handleEmotionSelect = (emotion) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedEmotion(emotion);
      setCurrentQuoteIndex(Math.floor(Math.random() * emotionsData[emotion].quotes.length));
      setIsAnimating(false);
    }, 300);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedEmotion(null);
      setIsAnimating(false);
    }, 300);
  };

  if (selectedEmotion) {
    const data = emotionsData[selectedEmotion];
    const quote = data.quotes[currentQuoteIndex];
    const tip = data.tips[currentQuoteIndex];
    const Icon = data.icon;

    return (
      <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${data.bgColor} pt-16`}>
        <AnimationBackground type={data.animation} />
        
        <div className={`relative z-10 min-h-screen flex items-center justify-center p-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className="max-w-2xl w-full">
            <button
              onClick={handleClose}
              className="mb-6 text-white hover:text-white/90 flex items-center gap-2 transition-all transform hover:translate-x-1 group drop-shadow-lg font-semibold text-lg"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back
            </button>

            <div className="bg-white/15 backdrop-blur-3xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-white/25 p-4 rounded-2xl shadow-lg backdrop-blur-sm">
                  <Icon size={40} className="text-white drop-shadow-lg" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{data.name}</h2>
              </div>

              <div className="mb-8 relative bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <div className="absolute -left-2 -top-2 text-6xl text-white/30">"</div>
                <p className="text-xl md:text-2xl text-white leading-relaxed pl-8 italic font-medium drop-shadow-md">
                  {quote}
                </p>
                <div className="absolute -right-2 -bottom-6 text-6xl text-white/30">"</div>
              </div>

              <div className="bg-white/15 rounded-2xl p-6 backdrop-blur-sm border border-white/20 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Heart size={24} className="text-white drop-shadow-md" />
                  <h3 className="text-xl font-semibold text-white drop-shadow-md">Try This:</h3>
                </div>
                <p className="text-white text-lg leading-relaxed drop-shadow-sm">{tip}</p>
              </div>

              <button
                onClick={() => setCurrentQuoteIndex((currentQuoteIndex + 1) % data.quotes.length)}
                className="w-full bg-gradient-to-r from-white/25 to-white/15 hover:from-white/35 hover:to-white/25 backdrop-blur-md text-white font-bold text-lg py-4 rounded-2xl transition-all border border-white/30 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] drop-shadow-lg"
              >
                Get Another Quote ✨
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white animate-pulse"
            style={{
              width: star.width + 'px',
              height: star.height + 'px',
              top: star.top + '%',
              left: star.left + '%',
              animationDelay: star.animationDelay + 's',
              animationDuration: star.animationDuration + 's',
              opacity: star.opacity,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center mb-12 max-w-3xl">
          <div className="mb-6 inline-block">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-full">
              <div className="bg-slate-900 rounded-full p-4">
                <Heart size={48} className="text-pink-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            How are you feeling today?
          </h1>
          <p className="text-xl text-white drop-shadow-md font-medium">
            Select an emotion to get support and guidance
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full">
          {Object.entries(emotionsData).map(([key, emotion]) => {
            const Icon = emotion.icon;
            return (
              <button
                key={key}
                onClick={() => handleEmotionSelect(key)}
                className="group relative overflow-hidden bg-white/10 hover:bg-white/15 backdrop-blur-xl p-6 md:p-8 rounded-3xl transition-all border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="p-4 rounded-2xl bg-white/15 group-hover:bg-white/25 transition-all shadow-lg">
                    <Icon size={36} className="text-white group-hover:scale-110 transition-transform drop-shadow-lg" />
                  </div>
                  <span className="text-lg md:text-xl font-bold text-white transition-colors drop-shadow-lg">
                    {emotion.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {!isAuthenticated && (
          <div className="mt-8 text-center">
            <p className="text-white/70 mb-4">Want to track your progress?</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg transform hover:scale-105"
            >
              Sign Up Now
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-white max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <p className="text-sm drop-shadow-md">
            Your mental health matters. This is a safe space for emotional support and guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN APP ==========
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Route path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={DashboardPage} />
      </Router>
    </AuthProvider>
  );
};

export default App;