import { Heart, Sparkles } from 'lucide-react';
import React from 'react'

export const EmotionCardsGrid = ({emotionsData,hoveredCard,handleEmotionSelect,setHoveredCard}) => {
  return (
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
  )
}
