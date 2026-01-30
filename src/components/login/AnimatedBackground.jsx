import React from 'react'

export const AnimatedBackground = ({particles}) => {
  return (
   <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Blobs */}
          <div 
            className="absolute w-96 h-96 bg-gradient-to-br from-orange-400/40 to-amber-400/40 rounded-full blur-3xl animate-morph-blob"
            style={{ top: '10%', left: '5%', animationDuration: '20s' }}
          />
          <div 
            className="absolute w-80 h-80 bg-gradient-to-br from-amber-400/30 to-orange-500/30 rounded-full blur-3xl animate-morph-blob"
            style={{ bottom: '15%', right: '10%', animationDuration: '25s', animationDelay: '5s' }}
          />
          <div 
            className="absolute w-72 h-72 bg-gradient-to-br from-rose-400/25 to-orange-400/25 rounded-full blur-3xl animate-morph-blob"
            style={{ top: '50%', right: '5%', animationDuration: '30s', animationDelay: '10s' }}
          />
          
          {/* Floating Particles */}
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-orange-400 to-amber-400 animate-float-particle"
              style={{
                width: particle.width + 'px',
                height: particle.height + 'px',
                left: particle.left + '%',
                bottom: '-20px',
                animationDuration: particle.animationDuration + 's',
                animationDelay: particle.animationDelay + 's',
                opacity: particle.opacity,
                boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)'
              }}
            />
          ))}
          
          {/* Decorative Rings */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64">
            <div className="absolute inset-0 rounded-full border-2 border-orange-300/30 animate-pulse-ring"></div>
            <div className="absolute inset-0 rounded-full border-2 border-amber-300/30 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 146, 60, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 146, 60, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
  )
}
