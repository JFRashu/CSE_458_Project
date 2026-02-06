import { Heart } from 'lucide-react';
import React from 'react'

export const LogoSection = ({ navigate, setActiveLink }) => {
  return (
    <div
      className="flex items-center space-x-3 cursor-pointer group"
      onClick={() => {
        navigate('/');
        setActiveLink('home');
      }}
    >
      {/* Animated Logo Container */}
      <div className="relative">
        {/* Pulsing Background Rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 opacity-10 animate-pulse"></div>

        {/* Main Logo */}
        <div className="relative profile-badge p-2 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Heart className="text-white" size={24} strokeWidth={2.5} />
        </div>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col">
        <span
          className="text-xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-gray-800 bg-clip-text text-transparent"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          MindfulSpace
        </span>
        <span className="text-[10px] text-orange-600 font-semibold tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Emotional Wellness
        </span>
      </div>
    </div>
  )
}
