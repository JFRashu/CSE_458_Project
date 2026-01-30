import { useState, useEffect } from 'react';
import { 
  Activity, Calendar, TrendingUp, Award, Brain, Sparkles, 
  Target, Zap, Clock, BarChart3, X, Book, Users, ArrowRight,
  CheckCircle2, Trophy, Flame, ChevronRight, Smile, Sun, Cloud, Wind,
  Frown, Meh,
  Star,
  Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { emotionsData } from '../data/emotionsData';
import AnimationBackground from '../components/AnimationBackground';
import Footer from '../components/Footer';
import { useNavigate } from '../utils/navigation';
import { dashboardStyles } from '../components/dashboard/dashboardStyle';
import DashboardBackground from '../components/dashboard/DashboardBackground';
import { MotivationalQoute } from '../components/dashboard/MotivationalQoute';
import {AIInsights} from '../components/dashboard/AIInsights';

const DashboardPage = ({ navigate :propNavigate}) => {
  const navigate = useNavigate() || propNavigate;
  const { user, isAuthenticated } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Dynamic background particles matching homepage theme
  const [particles] = useState(() =>
    [...Array(80)].map(() => ({
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 30 + 20,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.1,
    }))
  );

  // Floating hearts matching homepage
  const [floatingHearts] = useState(() =>
    [...Array(12)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5
    }))
  );

  // Stars matching homepage
  const [stars] = useState(() =>
    [...Array(30)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3
    }))
  );

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

  const stats = [
    { icon: Activity, label: 'Check-ins', value: '24', trend: '+12%', color: 'from-pink-500 to-rose-500', bgColor: 'from-pink-50 to-rose-50' },
    { icon: Calendar, label: 'Streak', value: '7 days', trend: 'Active', color: 'from-orange-500 to-amber-500', bgColor: 'from-orange-50 to-amber-50' },
    { icon: TrendingUp, label: 'Progress', value: '+15%', trend: 'Growing', color: 'from-amber-500 to-yellow-500', bgColor: 'from-amber-50 to-yellow-50' },
    { icon: Award, label: 'Badges', value: '5', trend: '2 new', color: 'from-rose-500 to-pink-500', bgColor: 'from-rose-50 to-pink-50' }
  ];

  const recentEmotions = [
    { emotion: 'Happy', time: '2 hours ago', icon: Sun, color: 'text-amber-500', bgColor: 'bg-amber-50', intensity: 85 },
    { emotion: 'Calm', time: '5 hours ago', icon: Cloud, color: 'text-blue-500', bgColor: 'bg-blue-50', intensity: 70 },
    { emotion: 'Anxious', time: 'Yesterday', icon: Wind, color: 'text-orange-500', bgColor: 'bg-orange-50', intensity: 60 }
  ];

  const weeklyMood = [
    { day: 'Mon', value: 70, emoji: '😊' },
    { day: 'Tue', value: 85, emoji: '😄' },
    { day: 'Wed', value: 60, emoji: '😐' },
    { day: 'Thu', value: 75, emoji: '🙂' },
    { day: 'Fri', value: 90, emoji: '😁' },
    { day: 'Sat', value: 80, emoji: '😊' },
    { day: 'Sun', value: 65, emoji: '😌' }
  ];

  const achievements = [
    { icon: Flame, title: '7 Day Streak', desc: 'Consistency is key!', color: 'text-orange-500', bgColor: 'bg-orange-50', unlocked: true },
    { icon: Trophy, title: 'First Check-in', desc: 'Started your journey', color: 'text-amber-500', bgColor: 'bg-amber-50', unlocked: true },
    { icon: Star, title: 'Mood Master', desc: '50 check-ins', color: 'text-rose-500', bgColor: 'bg-rose-50', unlocked: false },
    { icon: Heart, title: 'Self-Love', desc: '100 positive moments', color: 'text-pink-500', bgColor: 'bg-pink-50', unlocked: false }
  ];

  const quickActions = [
    { icon: Book, label: 'Journal', color: 'from-amber-500 to-orange-600', path: '/journal' },
    { icon: Target, label: 'Set Goals', color: 'from-orange-500 to-rose-600', path: '/goals' },
    { icon: Users, label: 'Community', color: 'from-rose-500 to-pink-600', path: '/community' }
  ];

  const insights = [
    { icon: Brain, text: 'Your most common emotion this week is Happy 😊', color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { icon: Zap, text: 'Peak emotional wellbeing occurs on Fridays', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { icon: Sparkles, text: 'Morning check-ins show 20% better mood', color: 'text-rose-600', bgColor: 'bg-rose-50' }
  ];

  // Emotion Modal View
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

  return (
    <>
      <style>{dashboardStyles}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 pt-20 pb-12 px-4">
        
        {/* Dynamic Background - Matching Homepage Theme */}
        <DashboardBackground
          particles={particles}
          floatingHearts={floatingHearts}
          stars={stars}
          mousePosition={mousePosition}
        />
          
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                 <h1 
  className="text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-tight text-gray-800"
  style={{ fontFamily: "'Playfair Display', serif" }}
>
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-lg text-gray-600 font-medium" style={{ fontFamily: "'Lora', serif" }}>
                  How are you feeling today?
                </p>
              </div>
              
              <div className="glass-morphism px-6 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {weeklyMood[new Date().getDay()].emoji} Feeling {weeklyMood[new Date().getDay()].value}% today
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Emotion Cards Grid - PRIMARY FEATURE */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Heart className="text-orange-600" size={28} strokeWidth={2.5} />
              Log Your Emotion
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(emotionsData).map(([key, emotion]) => {
                const Icon = emotion.icon;
                const isHovered = hoveredCard === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => handleEmotionSelect(key)}
                    onMouseEnter={() => setHoveredCard(key)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`card-3d card-shine group relative overflow-hidden glass-morphism rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300`}
                    style={{
                      padding: '1.25rem',
                      transform: isHovered 
                        ? `translateY(-8px) scale(1.05)` 
                        : 'translateY(0) scale(1)'
                    }}
                  >
                    <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                        background: `linear-gradient(135deg, ${emotion.bgColor.split(' ')[1]}, ${emotion.bgColor.split(' ')[2]})`,
                        filter: 'blur(15px)',
                        transform: 'scale(1.1)',
                        zIndex: -1
                      }}
                    ></div>

                    {isHovered && (
                      <>
                        <div className="absolute top-3 right-3 w-1 h-1 bg-orange-400 rounded-full animate-ping"></div>
                        <Sparkles 
                          size={14} 
                          className="absolute top-2 right-2 text-amber-400 animate-pulse" 
                        />
                      </>
                    )}
                    
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className={`relative p-3 rounded-xl ${emotion.accentBg} shadow-md transition-all duration-300 border border-white/50`}
                        style={{
                          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
                        }}
                      >
                        <Icon size={28} className={`${emotion.textColor} relative z-10`} strokeWidth={2.5} />
                      </div>
                      
                      <span 
                        className={`block text-sm font-bold ${emotion.textColor} transition-transform duration-300 text-center`}
                        style={{ 
                          fontFamily: "'Outfit', sans-serif",
                          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        {emotion.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const isHovered = hoveredCard === `stat-${index}`;
              
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(`stat-${index}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="stat-card glass-card rounded-2xl p-5 shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        <Icon className="text-white" size={22} strokeWidth={2.5} />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                        {stat.trend}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 font-medium mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {stat.value}
                    </p>
                  </div>
                  
                  {isHovered && (
                    <Sparkles className="absolute top-3 right-3 text-amber-400 animate-pulse" size={16} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Weekly Mood Chart */}
            <div className="lg:col-span-3 glass-card rounded-2xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <BarChart3 className="inline mr-2 text-orange-600" size={24} />
                  Weekly Mood Trend
                </h2>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="flex items-end justify-between gap-3 h-48">
                {weeklyMood.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-125">
                      {day.emoji}
                    </div>
                    <div className="w-full bg-gradient-to-t from-orange-500 to-amber-500 rounded-t-lg relative overflow-hidden bar-chart-item group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-300"
                      style={{ 
                        height: `${day.value}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100"></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 mt-1">{day.day}</span>
                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {day.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            
          </div>

          {/* Recent Activity & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Recent Check-ins */}
            <div className="glass-card rounded-2xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <Clock className="inline mr-2 text-rose-600" size={24} />
                Recent Check-ins
              </h2>
              
              <div className="space-y-3">
                {recentEmotions.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="group flex items-center gap-4 bg-white/60 hover:bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 transition-all cursor-pointer hover:shadow-md"
                    >
                      <div className={`${item.bgColor} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                        <Icon className={item.color} size={24} strokeWidth={2.5} />
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-bold text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {item.emotion}
                        </p>
                        <p className="text-sm text-gray-500">{item.time}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${item.color.replace('text-', 'from-')} to-${item.color.split('-')[1]}-600 rounded-full transition-all duration-500`}
                            style={{ width: `${item.intensity}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">{item.intensity}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card rounded-2xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <Trophy className="inline mr-2 text-amber-600" size={24} />
                Achievements
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={index}
                      className={`relative group p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        achievement.unlocked 
                          ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      {achievement.unlocked && (
                        <CheckCircle2 className="absolute top-2 right-2 text-green-500" size={16} />
                      )}
                      
                      <div className={`${achievement.bgColor} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className={achievement.color} size={24} strokeWidth={2.5} />
                      </div>
                      
                      <h3 className="font-bold text-sm text-gray-800 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {achievement.title}
                      </h3>
                      <p className="text-xs text-gray-600">{achievement.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <AIInsights insights={insights} />

          {/* Motivational Quote */}
          
          <MotivationalQoute/>
        </div>
     
      {/* Footer Component */}
        <Footer navigate={navigate} />
    </>
  );
};

export default DashboardPage;