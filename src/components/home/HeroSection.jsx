import { Heart, Sparkles } from 'lucide-react';

const HeroSection = ({ navigate, isAuthenticated }) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&display=swap');
        
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-animation {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float-animation 4s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Decorative Icon */}
          <div className="inline-block mb-8 animate-float">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 opacity-20 animate-pulse blur-xl"></div>
              <div className="relative bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-2xl shadow-2xl">
                <Heart className="text-white" size={48} strokeWidth={1.5} fill="white" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-6xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 leading-tight animate-fade-in-down"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your Mental Health Sanctuary
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up"
            style={{ fontFamily: "'Outfit', sans-serif", animationDelay: '0.2s' }}
          >
            Explore your emotions, find calm, and nurture your mental wellbeing. MindfulSpace is your companion on the journey to emotional wellness.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="relative overflow-hidden px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95 group"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Journey
                    <Sparkles size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="px-10 py-4 text-lg font-bold text-orange-600 bg-white border-2 border-orange-300 hover:bg-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Go to Dashboard
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            {[
              { number: '1M+', label: 'Emotions Tracked' },
              { number: '500K', label: 'Active Users' },
              { number: '98%', label: 'Satisfaction' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.number}
                </div>
                <p className="text-gray-600 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
