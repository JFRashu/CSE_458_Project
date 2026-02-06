import { Clock } from 'lucide-react';
import React from 'react'

export const RecentCheck_ins = ({recentEmotions}) => {
  return (
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
  )
}
