import { BarChart3, LogOut } from 'lucide-react';
import React from 'react'

export const DropdownMenu = ({ navigate, setActiveLink, setIsProfileOpen, handleLogout }) => {
  return (
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

  )
}
