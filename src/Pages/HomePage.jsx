import { useState, useEffect } from 'react';
import { Heart, Star, TrendingUp, Brain, Shield, Zap, Target, Users } from 'lucide-react';
import Footer from '../components/Footer';
import { useNavigate } from '../utils/navigation';
import { BackgroundElements } from '../components/home';
import { homePageStyles } from '../components/home/homeStyles';

const HomePage = ({ navigate: propNavigate }) => {
  const navigate = useNavigate() || propNavigate;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Insights',
      description: 'Get personalized recommendations based on your emotional patterns',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'from-purple-50 to-indigo-50'
    },
    {
      icon: Target,
      title: 'Track Your Progress',
      description: 'Monitor your emotional wellness journey with detailed analytics',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data is encrypted and never shared with third parties',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'from-emerald-50 to-green-50'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others on similar wellness journeys',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50'
    }
  ];

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
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 pb-32">

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

            <p className="text-sm text-gray-500 mt-4">No credit card required • Free forever</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-20 opacity-0 animate-fade-in-up delay-200">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="glass-morphism rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-default"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg mb-4`}>
                    <Icon className="text-white" size={28} strokeWidth={2.5} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {feature.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Premium CTA Card */}
          <div className="text-center mb-20 opacity-0 animate-fade-in-up delay-400">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-shimmer"></div>

              <div className="relative glass-morphism rounded-3xl p-8 shadow-2xl max-w-2xl border-2 border-white/80">
                <div className="mb-5">
                  <div className="inline-flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h3
                  className="text-3xl font-bold text-gray-800 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Start Your Wellness Journey Today
                </h3>

                <p className="text-base text-gray-600 mb-6 font-medium leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
                  Join thousands who are transforming their emotional wellbeing.
                  Track your emotions, gain insights, and grow stronger every day.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">10k+</div>
                    <div className="text-xs text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">50k+</div>
                    <div className="text-xs text-gray-600">Check-ins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">4.9★</div>
                    <div className="text-xs text-gray-600">User Rating</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/register')}
                  className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl transform hover:scale-105 active:scale-95 text-base group w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Create Free Account
                    <Zap size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>
            </div>
          </div>

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