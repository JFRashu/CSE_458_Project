import React from 'react'

export const Featurebadges = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-3xl">
            {[
              { icon: '🔒', text: 'Privacy First' },
              { icon: '🧠', text: 'Science-Backed' },
              { icon: '💪', text: 'Build Resilience' },
              { icon: '📊', text: 'Track Progress' }
            ].map((badge, i) => (
              <div
                key={i}
                className="glass-morphism px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default"
              >
                <span className="text-gray-700 font-semibold text-sm">
                  {badge.icon} {badge.text}
                </span>
              </div>
            ))}
          </div>
  )
}
