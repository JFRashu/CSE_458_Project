import { TrendingUp, Zap } from 'lucide-react'
import React from 'react'

export const Premium_CTA_Card = ({navigate}) => {
  return (
   <div className="text-center mb-20 opacity-0 animate-fade-in-up delay-400">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-shimmer"></div>

              <div className="relative glass-morphism rounded-3xl p-8 shadow-2xl max-w-2xl border-2 border-white/80">
                <div className="mb-5">
                  <div className="inline-flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 p-4 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <TrendingUp size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h3
                  className="text-3xl font-bold text-gray-800 mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Start Your Wellness Journey Today
                </h3>

                <p className="text-base text-gray-600 mb-6 font-medium leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
                  Join thousands who are transforming their emotional wellbeing.
                  Track your emotions, gain insights, and grow stronger every day.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">10k+</div>
                    <div className="text-xs text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">50k+</div>
                    <div className="text-xs text-gray-600">Check-ins</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">4.9★</div>
                    <div className="text-xs text-gray-600">User Rating</div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/register')}
                  className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-xl transform hover:scale-105 active:scale-95 text-base group w-full"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Create Free Account
                    <Zap size={18} className="group-hover:rotate-12 transition-transform duration-500" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>
            </div>
          </div>
  )
}
