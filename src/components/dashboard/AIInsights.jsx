import { Brain } from 'lucide-react';
import React from 'react'

export const AIInsights = ({insights}) => {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <Brain className="inline mr-2 text-purple-600" size={24} />
              AI-Powered Insights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {insights.map((insight, index) => {
                const Icon = insight.icon;
                return (
                  <div 
                    key={index}
                    className={`${insight.bgColor} border border-opacity-20 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <Icon className={`${insight.color} mb-3 group-hover:scale-110 transition-transform`} size={24} strokeWidth={2.5} />
                    <p className="text-sm text-gray-700 leading-relaxed font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {insight.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
  )
}
