import { BarChart3, LogOut, Sparkles, User } from 'lucide-react';
import React from 'react'

export const MobileAuthSection = ({ isAuthenticated, user, navigate, setIsMenuOpen, handleLogout }) => {
  return (
    <div className="pt-4 border-t border-gray-200 space-y-3">
      {isAuthenticated ? (
        <>
          {/* Mobile User Info */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <User size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-orange-600">{user?.email || 'user@email.com'}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              navigate('/dashboard');
              setIsMenuOpen(false);
            }}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all border-2 border-transparent hover:border-orange-200"
          >
            <BarChart3 size={20} className="text-orange-600" />
            <span className="font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Dashboard
            </span>
          </button>


          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 transition-all border-2 border-red-200"
          >
            <LogOut size={20} className="text-red-600" />
            <span className="font-semibold text-red-600" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Logout
            </span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              navigate('/login');
              setIsMenuOpen(false);
            }}
            className="w-full px-5 py-3 rounded-xl text-sm font-semibold text-gray-700 bg-white border-2 border-orange-200 hover:bg-orange-50 transition-all"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Login
          </button>

          <button
            onClick={() => {
              navigate('/register');
              setIsMenuOpen(false);
            }}
            className="w-full px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Get Started
            <Sparkles size={14} />
          </button>
        </>
      )}
    </div>
  )
}
