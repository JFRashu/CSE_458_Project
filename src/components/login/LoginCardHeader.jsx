import { Heart } from 'lucide-react'
import React from 'react'

export const LoginCardHeader = () => {
  return (
    <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 p-8 pb-12">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative text-center">
                {/* Logo with Animation */}
                <div className="inline-block mb-4 relative">
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse-ring"></div>
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
                  <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                    <Heart className="text-orange-600" size={40} strokeWidth={2.5} fill="rgba(251, 146, 60, 0.2)" />
                  </div>
                </div>
                
                <h2 
                  className="text-4xl font-bold text-white mb-2 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Welcome Back
                </h2>
                <p className="text-orange-100 text-base font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Continue your wellness journey
                </p>
              </div>
            </div>
  )
}
