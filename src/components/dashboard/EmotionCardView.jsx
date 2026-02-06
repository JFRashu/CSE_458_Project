import { Heart,  X } from 'lucide-react'
import React from 'react'

export const EmotionCardView = ({data,handleClose,tip,quote,setCurrentQuoteIndex,currentQuoteIndex,isAnimating}) => {
const Icon = data.icon;  // This works here
  return (
      <div className={`relative z-10 min-h-screen flex items-center justify-center p-4 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`}>
      <div className="max-w-xl w-full">
        <div className={`relative ${data.cardBg} backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/70`}>
          <button
            onClick={handleClose}
            className={`absolute -top-3 -right-3 ${data.textColor} bg-white hover:bg-gray-100 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90 shadow-xl border border-gray-200 z-20 group`}
          >
            <X 
              size={20} 
              strokeWidth={2.5} 
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </button>

          <div className="flex items-center gap-4 mb-5">
            <div className={`${data.accentBg} p-3 rounded-2xl shadow-lg backdrop-blur-sm border border-white/50`}>
              <Icon size={32} className={`${data.textColor}`} strokeWidth={2} />
            </div>
            <h2 className={`text-3xl font-bold ${data.textColor}`} style={{ fontFamily: "'Playfair Display', serif" }}>
              {data.name}
            </h2>
          </div>

          <div className="mb-5 relative bg-white/50 rounded-2xl p-5 backdrop-blur-sm shadow-sm border border-white/30">
            <div className={`absolute -left-3 -top-3 text-5xl ${data.textColor}/25 font-serif leading-none`}>"</div>
            <p className={`text-lg ${data.textColor} leading-relaxed pl-3 italic`} style={{ fontFamily: "'Lora', serif" }}>
              {quote}
            </p>
            <div className={`absolute -right-3 -bottom-6 text-5xl ${data.textColor}/25 font-serif leading-none`}>"</div>
          </div>

          <div className={`${data.accentBg} rounded-2xl p-4 backdrop-blur-sm border border-white/50 mb-5 shadow-md`}>
            <div className="flex items-center gap-2 mb-2">
              <Heart size={18} className={`${data.textColor}`} strokeWidth={2} />
              <h3 className={`text-base font-semibold ${data.textColor}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                Try This
              </h3>
            </div>
            <p className={`${data.textColor} text-sm leading-relaxed`}>
              {tip}
            </p>
          </div>

          <button
            onClick={() => setCurrentQuoteIndex((currentQuoteIndex + 1) % data.quotes.length)}
            className={`w-full bg-white/90 hover:bg-white ${data.textColor} font-semibold text-sm py-3 rounded-2xl transition-all border border-gray-200 shadow-md transform hover:scale-[1.01] active:scale-[0.99]`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Next Quote →
          </button>
        </div>
      </div>
    </div>
  )
}
