import { BarChart3, Heart, Zap, Brain } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Heart,
      title: 'Emotion Tracking',
      description: 'Identify and log your emotions with our intuitive emotion wheel. Understand your patterns over time.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Brain,
      title: 'Smart Insights',
      description: 'Receive personalized insights based on your emotional patterns and triggers.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Quick Tips',
      description: 'Get instant coping strategies and wellness tips tailored to your emotional state.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BarChart3,
      title: 'Progress Analytics',
      description: 'Visualize your emotional journey with beautiful charts and detailed analytics.',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&display=swap');
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }
      `}</style>

      <section id="features" className="relative z-10 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose MindfulSpace?
            </h2>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Comprehensive tools designed to help you understand and support your emotional wellbeing
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg transform group-hover:shadow-2xl transition-all duration-300"></div>
                  
                  {/* Border Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 transition-transform`}>
                      <Icon size={28} className="text-white" strokeWidth={2} />
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-xl font-bold text-gray-900 mb-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-gray-600 flex-grow leading-relaxed"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {feature.description}
                    </p>

                    {/* Hover Line */}
                    <div className={`h-1 bg-gradient-to-r ${feature.color} rounded-full mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
