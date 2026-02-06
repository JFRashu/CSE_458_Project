import { Icon, Sparkles } from 'lucide-react';
import React from 'react'

export const StatsGrid = ({stats,hoveredCard,setHoveredCard}) => {
  return (
    
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
  )
}
