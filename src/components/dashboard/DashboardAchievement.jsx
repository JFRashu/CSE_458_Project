import { CheckCircle2, Trophy } from 'lucide-react';
import React from 'react'

export const DashboardAchievement = ({achievements}) => {
  return (
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
                    className={`relative group p-4 rounded-xl border-2 transition-all cursor-pointer ${achievement.unlocked
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
  )
}
