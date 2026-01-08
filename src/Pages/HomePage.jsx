import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { emotionsData } from '../data/emotionsData';
import AnimationBackground from '../components/AnimationBackground';
import { useNavigate } from '../utils/navigation';

const HomePage = ({ navigate: propNavigate }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate() || propNavigate; // Use hook or fallback to prop
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
          <div className="max-w-lg w-full">
            <div className={`relative ${data.cardBg} backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-xl border border-white/60`}>
              <button
                onClick={handleClose}
                className={`absolute top-4 right-4 ${data.textColor} hover:${data.textColor}/90 flex items-center justify-center w-10 h-10 rounded-full transition-all transform hover:scale-110 group drop-shadow-lg font-semibold text-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm z-10`}
              >
                <X size={20} className="drop-shadow-lg" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className={`${data.accentBg} p-3 rounded-2xl shadow-lg backdrop-blur-sm`}>
                  <Icon size={32} className={`${data.textColor} drop-shadow-lg`} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${data.textColor} drop-shadow-lg`}>{data.name}</h2>
              </div>

              <div className="mb-6 relative bg-white/40 rounded-2xl p-4 backdrop-blur-sm">
                <div className={`absolute -left-2 -top-2 text-4xl ${data.textColor}/20`}>"</div>
                <p className={`text-lg md:text-xl ${data.textColor} leading-relaxed pl-6 italic font-medium drop-shadow-md`}>
                  {quote}
                </p>
                <div className={`absolute -right-2 -bottom-4 text-4xl ${data.textColor}/20`}>"</div>
              </div>

              <div className={`${data.accentBg} rounded-2xl p-4 backdrop-blur-sm border border-white/40 mb-5`}>
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={20} className={`${data.textColor} drop-shadow-md`} />
                  <h3 className={`text-lg font-semibold ${data.textColor} drop-shadow-md`}>Try This:</h3>
                </div>
                <p className={`${data.textColor} text-base leading-relaxed drop-shadow-sm`}>{tip}</p>
              </div>

              <button
                onClick={() => setCurrentQuoteIndex((currentQuoteIndex + 1) % data.quotes.length)}
                className={`w-full bg-gradient-to-r ${data.accentBg} hover:${data.accentBg.replace('/80', '/90')} backdrop-blur-md ${data.textColor} font-bold text-base py-3 rounded-2xl transition-all border border-white/50 shadow-lg transform hover:scale-[1.02] active:scale-[0.98] drop-shadow-lg`}
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-slate-400 animate-pulse"
            style={{
              width: star.width + 'px',
              height: star.height + 'px',
              top: star.top + '%',
              left: star.left + '%',
              animationDelay: star.animationDelay + 's',
              animationDuration: star.animationDuration + 's',
              opacity: star.opacity * 0.6,
              clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
            }}
          />
        ))}
      </div>

      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="text-center mb-12 max-w-3xl">
          <div className="mb-6 inline-block">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-1 rounded-full">
              <div className="bg-white rounded-full p-4">
                <Heart size={48} className="text-blue-500" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-700 mb-4 drop-shadow-lg">
            How are you feeling today?
          </h1>
          <p className="text-xl text-slate-600 drop-shadow-md font-medium">
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
                className="group relative overflow-hidden bg-white/70 hover:bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl transition-all border border-white/60 hover:border-white/80 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-2xl ${emotion.accentBg} group-hover:${emotion.accentBg.replace('/80', '/90')} transition-all shadow-lg`}>
                    <Icon size={36} className={`${emotion.textColor} group-hover:scale-110 transition-transform drop-shadow-lg`} />
                  </div>
                  <span className={`text-lg md:text-xl font-bold ${emotion.textColor} transition-colors drop-shadow-lg`}>
                    {emotion.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {!isAuthenticated && (
          <div className="mt-8 text-center">
            <p className="text-slate-500 mb-4">Want to track your progress?</p>
            <button
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg transform hover:scale-105"
            >
              Sign Up Now
            </button>
          </div>
        )}

        <div className="mt-12 text-center text-slate-600 max-w-md bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-white/40">
          <p className="text-sm drop-shadow-md">
            Your mental health matters. This is a safe space for emotional support and guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;