import React from 'react'

export const DashboardHeader = ({user,weeklyMood}) => {
  return (
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
  )
}
