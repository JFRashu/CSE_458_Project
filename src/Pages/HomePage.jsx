import { useState, useEffect } from 'react';
import { Heart, Star, TrendingUp, Brain, Shield, Zap, Target, Users } from 'lucide-react';
import Footer from '../components/footer/Footer';
import { useNavigate } from '../utils/navigation';
import { BackgroundElements, HeroSection } from '../components/home';
import { homePageStyles } from '../components/home/homeStyles';
import { FeaturesSection } from '../components/home/FeaturesSection';
import { Premium_CTA_Card } from '../components/home/PremiumCTACard';
import { Featurebadges } from '../components/home/Featurebadges';

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

          <HeroSection navigate={navigate} />

          {/* Features Grid */}
          <FeaturesSection features={features} />


          {/* Premium CTA Card */}
          <Premium_CTA_Card navigate={navigate} />

          {/* Feature badges */}
          <Featurebadges/>
        </div>


        {/* <Footer navigate={navigate} /> */}
      </div>
    </>
  );
};

export default HomePage;