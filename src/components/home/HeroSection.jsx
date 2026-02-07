import { Heart, Sparkles, Star } from 'lucide-react';

export const HeroSection = ({ navigate}) => {
  return (
    
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
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-gray-800"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Emotional Wellness Companion
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 font-medium mb-8" style={{ fontFamily: "'Lora', serif" }}>
              Track, understand, and improve your emotional wellbeing with AI-powered insights
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

              <button
                onClick={() => navigate('/login')}
                className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-10 py-4 rounded-2xl transition-all shadow-lg border-2 border-gray-200 hover:border-orange-300 text-base"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Sign In
              </button>
            </div>

            <p className="text-sm text-orange-900 mt-4">No credit card required • Free forever</p>
          </div>
  );
};

