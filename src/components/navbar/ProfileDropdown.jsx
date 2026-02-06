import { BarChart3, LogOut, User } from 'lucide-react';
import React from 'react'

export const ProfileDropdown = ({ user, navigate, setActiveLink, setIsProfileOpen, handleLogout }) => {
  return (
    <div className="absolute right-0 mt-3 w-64 animate-slide-down">
      <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
        {/* Dropdown Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <User size={22} className="text-orange-600" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {user?.name || 'User'}
              </p>
              <p className="text-orange-100 text-xs">{user?.email || 'user@email.com'}</p>
            </div>
          </div>
        </div>

        {/* Dropdown Menu Items */}
        <div className="p-2">
          <button
            onClick={() => {
              navigate('/dashboard');
              setIsProfileOpen(false);
              setActiveLink('dashboard');
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group"
          >
            <BarChart3 size={18} className="text-orange-600" />
            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Dashboard
            </span>
          </button>

          <div className="my-2 border-t border-gray-200"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all group"
          >
            <LogOut size={18} className="text-red-600" />
            <span className="text-sm font-semibold text-red-600 group-hover:text-red-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
