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
import { useNavigate } from '../utils/navigation';
import { dashboardStyles } from '../components/dashboard/dashboardStyle';
import DashboardBackground from '../components/dashboard/DashboardBackground';
import { MotivationalQoute } from '../components/dashboard/MotivationalQoute';
import { AIInsights } from '../components/dashboard/AIInsights';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { EmotionCardsGrid } from '../components/dashboard/EmotionCardsGrid';
import { StatsGrid } from '../components/dashboard/StatsGrid';
import { MainGrid } from '../components/dashboard/MainGrid';
import { RecentCheck_ins } from '../components/dashboard/RecentCheck_ins';
import { DashboardAchievement } from '../components/dashboard/DashboardAchievement';
import { EmotionCardView } from '../components/dashboard/EmotionCardView';

const DashboardPage = ({ navigate: propNavigate }) => {
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
        <EmotionCardView data={data} handleClose={handleClose} tip={tip} quote={quote} setCurrentQuoteIndex={setCurrentQuoteIndex} currentQuoteIndex={currentQuoteIndex} isAnimating={isAnimating} />

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
          scrollY={scrollY}
        />

        {/* Header */}
        <DashboardHeader user={user} weeklyMood={weeklyMood} />

        {/* Emotion Cards Grid - PRIMARY FEATURE */}

        <EmotionCardsGrid emotionsData={emotionsData} hoveredCard={hoveredCard} handleEmotionSelect={handleEmotionSelect} setHoveredCard={setHoveredCard} />

        {/* Stats Grid */}
        <StatsGrid stats={stats} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />

        {/* Main Grid */}
        <MainGrid weeklyMood={weeklyMood} />

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Recent Check-ins */}
          <RecentCheck_ins recentEmotions={recentEmotions} />

          {/* Achievements */}

          <DashboardAchievement achievements={achievements} />
        </div>

        {/* AI Insights */}
        <AIInsights insights={insights} />

        {/* Motivational Quote */}

        <MotivationalQoute />
      </div>


    </>
  );
};

export default DashboardPage;