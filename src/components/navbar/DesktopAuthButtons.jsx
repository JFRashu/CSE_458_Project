import { User } from 'lucide-react'
import React from 'react'

export const DesktopAuthButtons = ({ isProfileOpen, setIsProfileOpen, user }) => {
  return (
    <button
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-300 transition-all group"
    >
      {/* User Avatar */}
      <div className="relative">
        <div className="profile-badge w-9 h-9 rounded-full flex items-center justify-center shadow-md">
          <User size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-float-badge"></div>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-start">
        <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {user?.name || 'User'}
        </span>
        <span className="text-xs text-orange-600 font-medium">View Profile</span>
      </div>

      {/* Dropdown Arrow */}
      <svg
        className={`w-4 h-4 text-orange-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}
