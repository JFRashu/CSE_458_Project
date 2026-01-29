import { useState, useEffect } from 'react';
import { Heart, X, Sparkles, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { emotionsData } from '../data/emotionsData';
import AnimationBackground from '../components/AnimationBackground';
import Footer from '../components/Footer';
import { useNavigate } from '../utils/navigation';

const HomePage = ({ navigate: propNavigate }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate() || propNavigate;
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  // Generate floating particles - increased quantity
  const [particles] = useState(() => 
    [...Array(80)].map(() => ({
      size: Math.random() * 8 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.5 + 0.2
    }))
  );

  // Generate geometric shapes - increased variety
  const [shapes] = useState(() => 
    [...Array(25)].map(() => ({
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
      size: Math.random() * 120 + 60,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: Math.random() * 40 + 25,
      delay: Math.random() * 8
    }))
  );

  // Generate floating hearts
  const [floatingHearts] = useState(() =>
    [...Array(12)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }))
  );

  // Generate stars
  const [stars] = useState(() =>
    [...Array(30)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleEmotionSelect = (emotion) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedEmotion(emotion);
      setCurrentQuoteIndex(Math.floor(Math.random() * emotionsData[emotion].quotes.length));
      setIsAnimating(false);
    }, 350);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedEmotion(null);
      setIsAnimating(false);
    }, 350);
  };

  if (selectedEmotion) {
    const data = emotionsData[selectedEmotion];
    const quote = data.quotes[currentQuoteIndex];
    const tip = data.tips[currentQuoteIndex];
    const Icon = data.icon;

    return (
      <div className={`min-h-screen relative overflow-hidden bg-gradient-to-br ${data.bgColor} pt-16`}>
        <AnimationBackground type={data.animation} />
        
        <div className={`relative z-10 min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
          <div className="max-w-xl w-full">
            <div className={`relative ${data.cardBg} backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/70`}>
              <button
                onClick={handleClose}
                className={`absolute -top-3 -right-3 ${data.textColor} bg-white hover:bg-gray-100 flex items-center justify-center w-11 h-11 rounded-full transition-all transform hover:scale-110 hover:rotate-90 shadow-xl border border-gray-200 z-20`}
              >
                <X size={20} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div className={`${data.accentBg} p-3 rounded-2xl shadow-lg backdrop-blur-sm border border-white/50`}>
                  <Icon size={32} className={`${data.textColor}`} strokeWidth={2} />
                </div>
                <h2 className={`text-3xl font-bold ${data.textColor}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                  {data.name}
                </h2>
              </div>

              <div className="mb-5 relative bg-white/50 rounded-2xl p-5 backdrop-blur-sm shadow-sm border border-white/30">
                <div className={`absolute -left-3 -top-3 text-5xl ${data.textColor}/25 font-serif leading-none`}>"</div>
                <p className={`text-lg ${data.textColor} leading-relaxed pl-3 italic`} style={{ fontFamily: "'Lora', serif" }}>
                  {quote}
                </p>
                <div className={`absolute -right-3 -bottom-6 text-5xl ${data.textColor}/25 font-serif leading-none`}>"</div>
              </div>

              <div className={`${data.accentBg} rounded-2xl p-4 backdrop-blur-sm border border-white/50 mb-5 shadow-md`}>
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={18} className={`${data.textColor}`} strokeWidth={2} />
                  <h3 className={`text-base font-semibold ${data.textColor}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                    Try This
                  </h3>
                </div>
                <p className={`${data.textColor} text-sm leading-relaxed`}>
                  {tip}
                </p>
              </div>

              <button
                onClick={() => setCurrentQuoteIndex((currentQuoteIndex + 1) % data.quotes.length)}
                className={`w-full bg-white/90 hover:bg-white ${data.textColor} font-semibold text-sm py-3 rounded-2xl transition-all border border-gray-200 shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Next Quote →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const parallaxOffset = scrollY * 0.3;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&family=Lora:ital@0;1&display=swap');
        
        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }
        
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }
        
        @keyframes wave {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
          }
          25% { 
            transform: translateY(-20px) translateX(10px); 
          }
          75% { 
            transform: translateY(20px) translateX(-10px); 
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.3); }
          50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.6); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 70% 30% 50% 50% / 30% 70% 60% 40%; }
          75% { border-radius: 40% 60% 30% 70% / 60% 40% 50% 60%; }
        }

        @keyframes float-diagonal {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg);
          }
          25% { 
            transform: translate(20px, -20px) rotate(5deg);
          }
          50% { 
            transform: translate(0, -40px) rotate(0deg);
          }
          75% { 
            transform: translate(-20px, -20px) rotate(-5deg);
          }
        }

        @keyframes sparkle {
          0%, 100% { 
            opacity: 0;
            transform: scale(0);
          }
          50% { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes drift {
          0% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
          100% {
            transform: translate(0, 0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(251, 146, 60, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.8));
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-float-up {
          animation: float-up linear infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow linear infinite;
        }
        
        .animate-pulse-scale {
          animation: pulse-scale ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave ease-in-out infinite;
        }
        
        .animate-morph {
          animation: morph ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-float-diagonal {
          animation: float-diagonal ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }

        .animate-drift {
          animation: drift ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.6);
        }
        
        .card-3d {
          transform-style: preserve-3d;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .card-3d:hover {
          transform: translateY(-12px) rotateX(5deg);
        }
        
        .card-shine {
          position: relative;
          overflow: hidden;
        }
        
        .card-shine::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          transform: rotate(45deg);
          transition: all 0.6s;
          opacity: 0;
        }
        
        .card-shine:hover::before {
          opacity: 1;
          animation: shimmer 1.5s;
        }
        
        .mesh-gradient {
          background: 
            radial-gradient(at 27% 37%, rgba(251, 146, 60, 0.2) 0px, transparent 50%),
            radial-gradient(at 97% 21%, rgba(234, 88, 12, 0.2) 0px, transparent 50%),
            radial-gradient(at 52% 99%, rgba(249, 115, 22, 0.2) 0px, transparent 50%),
            radial-gradient(at 10% 29%, rgba(251, 191, 36, 0.2) 0px, transparent 50%),
            radial-gradient(at 97% 96%, rgba(217, 119, 6, 0.2) 0px, transparent 50%),
            radial-gradient(at 33% 50%, rgba(245, 158, 11, 0.2) 0px, transparent 50%),
            radial-gradient(at 79% 53%, rgba(251, 146, 60, 0.2) 0px, transparent 50%);
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-16">
        
        {/* Enhanced Multi-Layer Background */}
        <div className="absolute inset-0 overflow-hidden">
          
          {/* Base Mesh Gradient Layer */}
          <div className="absolute inset-0 mesh-gradient"></div>

          {/* Animated Gradient Orbs with Morph - More vibrant */}
          <div 
            className="absolute w-[600px] h-[600px] blur-3xl opacity-50 animate-morph"
            style={{
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.7) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%)',
              top: `${5 - parallaxOffset * 0.2}%`,
              left: '0%',
              animationDuration: '20s'
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] blur-3xl opacity-45 animate-morph"
            style={{
              background: 'radial-gradient(circle, rgba(234, 88, 12, 0.6) 0%, rgba(234, 88, 12, 0.3) 50%, transparent 100%)',
              top: `${30 - parallaxOffset * 0.15}%`,
              right: '5%',
              animationDuration: '25s',
              animationDelay: '5s'
            }}
          />
          <div 
            className="absolute w-[550px] h-[550px] blur-3xl opacity-40 animate-morph"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 100%)',
              bottom: `${10 - parallaxOffset * 0.25}%`,
              left: '20%',
              animationDuration: '30s',
              animationDelay: '10s'
            }}
          />
          <div 
            className="absolute w-[450px] h-[450px] blur-3xl opacity-35 animate-morph"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 100%)',
              top: `${50 - parallaxOffset * 0.2}%`,
              left: '50%',
              animationDuration: '35s',
              animationDelay: '15s'
            }}
          />

          {/* Floating Hearts */}
          {floatingHearts.map((heart, i) => (
            <div
              key={`heart-${i}`}
              className="absolute animate-float-diagonal animate-pulse-glow"
              style={{
                left: heart.x + '%',
                top: heart.y + '%',
                animationDuration: heart.duration + 's',
                animationDelay: heart.delay + 's'
              }}
            >
              <Heart 
                size={heart.size} 
                className="text-orange-400/40" 
                fill="rgba(251, 146, 60, 0.2)"
                strokeWidth={1.5}
              />
            </div>
          ))}

          {/* Twinkling Stars */}
          {stars.map((star, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-amber-400 animate-twinkle"
              style={{
                width: star.size + 'px',
                height: star.size + 'px',
                left: star.x + '%',
                top: star.y + '%',
                animationDuration: star.duration + 's',
                animationDelay: star.delay + 's',
                boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)'
              }}
            />
          ))}

          {/* Enhanced Floating Particles */}
          {particles.map((particle, i) => (
            <div
              key={`particle-${i}`}
              className="absolute rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-orange-300 animate-float-up"
              style={{
                width: particle.size + 'px',
                height: particle.size + 'px',
                left: particle.x + '%',
                bottom: '0',
                animationDuration: particle.duration + 's',
                animationDelay: particle.delay + 's',
                opacity: particle.opacity,
                boxShadow: '0 0 15px rgba(251, 146, 60, 0.6)'
              }}
            />
          ))}

          {/* Enhanced Geometric Shapes with variety */}
          {shapes.map((shape, i) => (
            <div
              key={`shape-${i}`}
              className={`absolute border-2 border-orange-400/30 ${
                shape.type === 'circle' ? 'rounded-full' : 
                shape.type === 'square' ? 'rounded-lg' : 
                'rounded-none'
              } animate-rotate-slow animate-drift`}
              style={{
                width: shape.size + 'px',
                height: shape.size + 'px',
                left: shape.x + '%',
                top: shape.y + '%',
                animationDuration: shape.duration + 's',
                animationDelay: shape.delay + 's',
                transform: `rotate(${shape.rotation}deg)`,
                background: shape.type === 'triangle' 
                  ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, transparent 100%)'
                  : 'transparent'
              }}
            >
              {shape.type === 'triangle' && (
                <div 
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)'
                  }}
                />
              )}
            </div>
          ))}

          {/* Multiple Wavy Lines with different colors */}
          <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#ea580c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#c2410c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path 
              d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100" 
              stroke="url(#gradient1)" 
              strokeWidth="4" 
              fill="none"
              className="animate-wave"
              style={{ animationDuration: '15s' }}
            />
            <path 
              d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200" 
              stroke="url(#gradient2)" 
              strokeWidth="3" 
              fill="none"
              className="animate-wave"
              style={{ animationDuration: '20s', animationDelay: '2s' }}
            />
            <path 
              d="M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300" 
              stroke="url(#gradient1)" 
              strokeWidth="3" 
              fill="none"
              className="animate-wave"
              style={{ animationDuration: '18s', animationDelay: '4s' }}
            />
            <path 
              d="M0,400 Q250,350 500,400 T1000,400 T1500,400 T2000,400" 
              stroke="url(#gradient3)" 
              strokeWidth="2" 
              fill="none"
              className="animate-wave"
              style={{ animationDuration: '22s', animationDelay: '6s' }}
            />
            <path 
              d="M0,500 Q250,450 500,500 T1000,500 T1500,500 T2000,500" 
              stroke="url(#gradient2)" 
              strokeWidth="2" 
              fill="none"
              className="animate-wave"
              style={{ animationDuration: '25s', animationDelay: '8s' }}
            />
          </svg>

          {/* Enhanced Pulsing Rings - More visible */}
          <div className="absolute top-1/4 right-1/4 w-80 h-80">
            <div className="absolute inset-0 rounded-full border-3 border-orange-400/40 animate-pulse-scale" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-0 rounded-full border-3 border-amber-400/40 animate-pulse-scale" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-orange-500/40 animate-pulse-scale" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
          </div>

          <div className="absolute bottom-1/3 left-1/4 w-72 h-72">
            <div className="absolute inset-0 rounded-full border-3 border-amber-300/40 animate-pulse-scale" style={{ animationDuration: '5s' }}></div>
            <div className="absolute inset-0 rounded-full border-2 border-orange-300/40 animate-pulse-scale" style={{ animationDuration: '5s', animationDelay: '1.5s' }}></div>
          </div>

          {/* Animated Dot Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(20)].map((_, i) => (
              <div key={`row-${i}`} className="flex justify-around" style={{ marginTop: '3rem' }}>
                {[...Array(30)].map((_, j) => (
                  <div
                    key={`dot-${i}-${j}`}
                    className="w-1 h-1 rounded-full bg-orange-500 animate-pulse"
                    style={{
                      animationDuration: `${2 + Math.random() * 2}s`,
                      animationDelay: `${Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Enhanced Grid Pattern Overlay with motion */}
          <div 
            className="absolute inset-0 opacity-8"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 146, 60, 0.6) 2px, transparent 2px),
                linear-gradient(90deg, rgba(251, 146, 60, 0.6) 2px, transparent 2px)
              `,
              backgroundSize: '60px 60px',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>

          {/* Enhanced Spotlight Effect Following Mouse */}
          <div 
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
            style={{
              background: 'radial-gradient(circle, rgba(251, 146, 60, 0.25) 0%, rgba(234, 88, 12, 0.15) 40%, transparent 70%)',
              left: mousePosition.x - 250,
              top: mousePosition.y - 250,
              filter: 'blur(50px)'
            }}
          ></div>

          {/* Secondary Spotlight */}
          <div 
            className="absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-transform duration-1000 ease-out"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
              left: mousePosition.x - 175,
              top: mousePosition.y - 175,
              filter: 'blur(40px)',
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
            }}
          ></div>

          {/* Decorative Corner Gradients - Enhanced */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-amber-300/25 via-orange-200/15 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-300/25 via-amber-200/15 to-transparent blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 blur-3xl"></div>

          {/* Sparkle Effects */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
              }}
            />
          ))}

          {/* Radial Lines from Center */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16;
              return (
                <line
                  key={`radial-${i}`}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`}
                  y2={`${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`}
                  stroke="rgba(251, 146, 60, 0.3)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        {/* Main Content */}
        <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pb-32 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-4xl opacity-0 animate-fade-in-up">
            <div className="mb-8 inline-block animate-float-gentle">
              <div className="relative">
                {/* Multiple Pulsing rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-30 animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 opacity-15 animate-ping" style={{ animationDelay: '1s' }}></div>
                
                <div className="relative bg-white p-2 rounded-full shadow-2xl animate-glow-pulse">
                  <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 p-6 rounded-full">
                    <Heart size={48} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight bg-gradient-to-r from-gray-800 via-orange-700 to-gray-800 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How are you feeling today?
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6" style={{ fontFamily: "'Lora', serif" }}>
              Your emotions matter. Let's navigate them together.
            </p>
            
            <div className="inline-flex items-center gap-3 glass-morphism px-6 py-3 rounded-full shadow-xl">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-base font-semibold text-gray-700">Choose an emotion to start your journey</span>
            </div>
          </div>

          {/* Emotion Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 max-w-5xl w-full mb-20">
            {Object.entries(emotionsData).map(([key, emotion], index) => {
              const Icon = emotion.icon;
              const isHovered = hoveredCard === key;
              
              return (
                <button
                  key={key}
                  onClick={() => handleEmotionSelect(key)}
                  onMouseEnter={() => setHoveredCard(key)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`card-3d card-shine group relative overflow-hidden glass-morphism rounded-2xl shadow-xl hover:shadow-2xl opacity-0 animate-fade-in-up delay-${index + 1}00`}
                  style={{
                    padding: '1.5rem',
                    transform: isHovered 
                      ? `translateY(-12px) rotateX(5deg) scale(1.02)` 
                      : 'translateY(0) rotateX(0) scale(1)'
                  }}
                >
                  <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      background: `linear-gradient(135deg, ${emotion.bgColor.split(' ')[1]}, ${emotion.bgColor.split(' ')[2]})`,
                      filter: 'blur(20px)',
                      transform: 'scale(1.1)',
                      zIndex: -1
                    }}
                  ></div>

                  {isHovered && (
                    <>
                      <div className="absolute top-4 right-4 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-6 left-6 w-1 h-1 bg-amber-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
                    </>
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className={`relative p-4 rounded-2xl ${emotion.accentBg} shadow-lg transition-all duration-300 border border-white/50`}
                      style={{
                        transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                      }}
                    >
                      <div className={`absolute inset-0 rounded-2xl blur-md transition-opacity duration-300 ${isHovered ? 'opacity-50' : 'opacity-0'}`}
                        style={{ background: emotion.accentBg }}
                      ></div>
                      
                      <Icon size={36} className={`${emotion.textColor} relative z-10`} strokeWidth={2.5} />
                      
                      {isHovered && (
                        <Sparkles 
                          size={16} 
                          className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" 
                        />
                      )}
                    </div>
                    
                    <div className="text-center">
                      <span 
                        className={`block text-lg font-bold ${emotion.textColor} mb-1 transition-transform duration-300`}
                        style={{ 
                          fontFamily: "'Outfit', sans-serif",
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        {emotion.name}
                      </span>
                      
                      <div 
                        className={`h-0.5 bg-gradient-to-r ${emotion.accentBg} rounded-full transition-all duration-300 mx-auto`}
                        style={{ width: isHovered ? '100%' : '0%' }}
                      ></div>
                    </div>

                    <div className={`text-xs text-gray-600 font-medium transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      Click to explore →
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Premium CTA Card */}
          {!isAuthenticated && (
            <div className="text-center mb-20 opacity-0 animate-fade-in-up delay-600">
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-shimmer"></div>
                
                <div className="relative glass-morphism rounded-3xl p-8 shadow-2xl max-w-lg border-2 border-white/80">
                  <div className="mb-5">
                    <div className="inline-flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                      <TrendingUp size={32} className="text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <h3 
                    className="text-3xl font-bold text-gray-800 mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Track Your Journey
                  </h3>
                  
                  <p className="text-base text-gray-600 mb-6 font-medium leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
                    Join thousands who are transforming their emotional wellbeing. 
                    Track progress, gain insights, and grow stronger every day.
                  </p>
                  
                  <button
                    onClick={() => navigate('/register')}
                    className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl transform hover:scale-105 active:scale-95 text-base group"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Started Free
                      <Star size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                  
                  <p className="text-xs text-gray-500 mt-4">No credit card required</p>
                </div>
              </div>
            </div>
          )}

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
            {[
              { icon: '🔒', text: 'Privacy First' },
              { icon: '🧠', text: 'Science-Backed' },
              { icon: '💪', text: 'Build Resilience' },
              { icon: '📊', text: 'Track Progress' }
            ].map((badge, i) => (
              <div 
                key={i}
                className="glass-morphism px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default"
              >
                <span className="text-gray-700 font-semibold text-sm">
                  {badge.icon} {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Component */}
        <Footer navigate={navigate} />
      </div>
    </>
  );
};

export default HomePage;