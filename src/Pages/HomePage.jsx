import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { emotionsData } from '../data/emotionsData';
import AnimationBackground from '../components/AnimationBackground';

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

export default HomePage;