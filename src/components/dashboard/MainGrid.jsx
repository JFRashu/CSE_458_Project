import { BarChart3, ChevronRight } from 'lucide-react'
import React from 'react'

export const MainGrid = ({weeklyMood}) => {
  return (
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
  )
}
