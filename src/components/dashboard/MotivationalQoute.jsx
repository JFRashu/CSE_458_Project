import { Sparkles } from 'lucide-react'
import React from 'react'   

export const MotivationalQoute = () => {
  return (
    <div className="mt-6 relative overflow-hidden rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 opacity-90"></div>
            <div className="absolute inset-0 shimmer-bg opacity-30"></div>
            
            <div className="relative z-10 p-8 text-center">
              <Sparkles className="inline-block text-yellow-300 mb-3 animate-pulse" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                "Your mental health is a priority, not a luxury."
              </h3>
              <p className="text-white/90 font-medium" style={{ fontFamily: "'Lora', serif" }}>
                Keep up the amazing work on your wellness journey! 🌟
              </p>
            </div>
          </div>
        
  )
}
