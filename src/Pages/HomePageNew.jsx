import { useState, useEffect } from 'react';
import { Heart, X, Sparkles, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { emotionsData } from '../data/emotionsData';
import AnimationBackground from '../components/AnimationBackground';
import Footer from '../components/Footer';
import { useNavigate } from '../utils/navigation';
import { BackgroundElements } from '../components/home';
import { homePageStyles } from '../components/home/homeStyles';

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

  // Generate sparkles
  const [sparkles] = useState(() =>
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 5
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

  // Emotion Detail View
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

  // Main Home Page View
  return (
    <>
      <style>{homePageStyles}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-16">
        
        {/* Background Components - All animations and visual effects */}
        <BackgroundElements 
          particles={particles}
          shapes={shapes}
          floatingHearts={floatingHearts}
          stars={stars}
          sparkles={sparkles}
          mousePosition={mousePosition}
          scrollY={scrollY}
        />

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

          {/* Emotion Cards Grid */}
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
