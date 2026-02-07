import { Heart } from 'lucide-react';

/**
 * BackgroundElements - All background rendering with animations
 * Includes: particles, shapes, hearts, stars, sparkles, waves, rings, grids, spotlight
 */
export const  BackgroundElements = ({ 
  particles, 
  shapes, 
  floatingHearts, 
  stars, 
  sparkles,
  mousePosition = { x: 0, y: 0 }, 
  scrollY = 0 
}) => {
  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="absolute inset-0 overflow-hidden">
      
      {/* Base Mesh Gradient Layer */}
      <div className="absolute inset-0 mesh-gradient"></div>

      {/* Animated Gradient Orbs with Morph - More vibrant */}
      <div 
        className="absolute w-[600px] h-[600px] blur-3xl opacity-50 animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.7) 0%, rgba(251, 146, 60, 0.3) 50%, transparent 100%)',
          top: `${5 - parallaxOffset * 0.2}%`,
          left: '0%',
          animationDuration: '20s'
        }}
      />
      <div 
        className="absolute w-[500px] h-[500px] blur-3xl opacity-45 animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.6) 0%, rgba(234, 88, 12, 0.3) 50%, transparent 100%)',
          top: `${30 - parallaxOffset * 0.15}%`,
          right: '5%',
          animationDuration: '25s',
          animationDelay: '5s'
        }}
      />
      <div 
        className="absolute w-[550px] h-[550px] blur-3xl opacity-40 animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 100%)',
          bottom: `${10 - parallaxOffset * 0.25}%`,
          left: '20%',
          animationDuration: '30s',
          animationDelay: '10s'
        }}
      />
      <div 
        className="absolute w-[450px] h-[450px] blur-3xl opacity-35 animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 100%)',
          top: `${50 - parallaxOffset * 0.2}%`,
          left: '50%',
          animationDuration: '35s',
          animationDelay: '15s'
        }}
      />

      {/* Floating Hearts */}
      {floatingHearts.map((heart, i) => (
        <div
          key={`heart-${i}`}
          className="absolute animate-float-diagonal animate-pulse-glow"
          style={{
            left: heart.x + '%',
            top: heart.y + '%',
            animationDuration: heart.duration + 's',
            animationDelay: heart.delay + 's'
          }}
        >
          <Heart 
            size={heart.size} 
            className="text-orange-400/40" 
            fill="rgba(251, 146, 60, 0.2)"
            strokeWidth={1.5}
          />
        </div>
      ))}

      {/* Twinkling Stars */}
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute rounded-full bg-amber-400 animate-twinkle"
          style={{
            width: star.size + 'px',
            height: star.size + 'px',
            left: star.x + '%',
            top: star.y + '%',
            animationDuration: star.duration + 's',
            animationDelay: star.delay + 's',
            boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)'
          }}
        />
      ))}

      {/* Enhanced Floating Particles */}
      {particles.map((particle, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-orange-400 via-amber-400 to-orange-300 animate-float-up"
          style={{
            width: particle.size + 'px',
            height: particle.size + 'px',
            left: particle.x + '%',
            bottom: '0',
            animationDuration: particle.duration + 's',
            animationDelay: particle.delay + 's',
            opacity: particle.opacity,
            boxShadow: '0 0 15px rgba(251, 146, 60, 0.6)'
          }}
        />
      ))}

      {/* Enhanced Geometric Shapes with variety */}
      {shapes.map((shape, i) => (
        <div
          key={`shape-${i}`}
          className={`absolute border-2 border-orange-400/30 ${
            shape.type === 'circle' ? 'rounded-full' : 
            shape.type === 'square' ? 'rounded-lg' : 
            'rounded-none'
          } animate-rotate-slow animate-drift`}
          style={{
            width: shape.size + 'px',
            height: shape.size + 'px',
            left: shape.x + '%',
            top: shape.y + '%',
            animationDuration: shape.duration + 's',
            animationDelay: shape.delay + 's',
            transform: `rotate(${shape.rotation}deg)`,
            background: shape.type === 'triangle' 
              ? 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, transparent 100%)'
              : 'transparent'
          }}
        >
          {shape.type === 'triangle' && (
            <div 
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(234, 88, 12, 0.1) 100%)'
              }}
            />
          )}
        </div>
      ))}

      {/* Multiple Wavy Lines with different colors */}
      <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#c2410c" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path 
          d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100" 
          stroke="url(#gradient1)" 
          strokeWidth="4" 
          fill="none"
          className="animate-wave"
          style={{ animationDuration: '15s' }}
        />
        <path 
          d="M0,200 Q250,150 500,200 T1000,200 T1500,200 T2000,200" 
          stroke="url(#gradient2)" 
          strokeWidth="3" 
          fill="none"
          className="animate-wave"
          style={{ animationDuration: '20s', animationDelay: '2s' }}
        />
        <path 
          d="M0,300 Q250,250 500,300 T1000,300 T1500,300 T2000,300" 
          stroke="url(#gradient1)" 
          strokeWidth="3" 
          fill="none"
          className="animate-wave"
          style={{ animationDuration: '18s', animationDelay: '4s' }}
        />
        <path 
          d="M0,400 Q250,350 500,400 T1000,400 T1500,400 T2000,400" 
          stroke="url(#gradient3)" 
          strokeWidth="2" 
          fill="none"
          className="animate-wave"
          style={{ animationDuration: '22s', animationDelay: '6s' }}
        />
        <path 
          d="M0,500 Q250,450 500,500 T1000,500 T1500,500 T2000,500" 
          stroke="url(#gradient2)" 
          strokeWidth="2" 
          fill="none"
          className="animate-wave"
          style={{ animationDuration: '25s', animationDelay: '8s' }}
        />
      </svg>

      {/* Enhanced Pulsing Rings - More visible */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80">
        <div className="absolute inset-0 rounded-full border-3 border-orange-400/40 animate-pulse-scale" style={{ animationDuration: '4s' }}></div>
        <div className="absolute inset-0 rounded-full border-3 border-amber-400/40 animate-pulse-scale" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-orange-500/40 animate-pulse-scale" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
      </div>

      <div className="absolute bottom-1/3 left-1/4 w-72 h-72">
        <div className="absolute inset-0 rounded-full border-3 border-amber-300/40 animate-pulse-scale" style={{ animationDuration: '5s' }}></div>
        <div className="absolute inset-0 rounded-full border-2 border-orange-300/40 animate-pulse-scale" style={{ animationDuration: '5s', animationDelay: '1.5s' }}></div>
      </div>

      {/* Animated Dot Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div key={`row-${i}`} className="flex justify-around" style={{ marginTop: '3rem' }}>
            {[...Array(30)].map((_, j) => (
              <div
                key={`dot-${i}-${j}`}
                className="w-1 h-1 rounded-full bg-orange-500 animate-pulse"
                style={{
                  animationDuration: `${2 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Enhanced Grid Pattern Overlay with motion */}
      <div 
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 146, 60, 0.6) 2px, transparent 2px),
            linear-gradient(90deg, rgba(251, 146, 60, 0.6) 2px, transparent 2px)
          `,
          backgroundSize: '60px 60px',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      ></div>

      {/* Enhanced Spotlight Effect Following Mouse */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.25) 0%, rgba(234, 88, 12, 0.15) 40%, transparent 70%)',
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          filter: 'blur(50px)'
        }}
      ></div>

      {/* Secondary Spotlight */}
      <div 
        className="absolute w-[350px] h-[350px] rounded-full pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)',
          left: mousePosition.x - 175,
          top: mousePosition.y - 175,
          filter: 'blur(40px)',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      ></div>

      {/* Decorative Corner Gradients - Enhanced */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-amber-300/25 via-orange-200/15 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-300/25 via-amber-200/15 to-transparent blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 blur-3xl"></div>

      {/* Sparkle Effects */}
      {sparkles.map((sparkle, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animationDuration: `${sparkle.duration}s`,
            animationDelay: `${sparkle.delay}s`,
            boxShadow: '0 0 10px rgba(251, 191, 36, 0.8)'
          }}
        />
      ))}

      {/* Radial Lines from Center */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        {[...Array(16)].map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <line
              key={`radial-${i}`}
              x1="50%"
              y1="50%"
              x2={`${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`}
              y2={`${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`}
              stroke="rgba(251, 146, 60, 0.3)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};


