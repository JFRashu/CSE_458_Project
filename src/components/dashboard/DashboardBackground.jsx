import { Heart, Star } from 'lucide-react';

const DashboardBackground = ({
  particles,
  floatingHearts,
  stars,
   mousePosition = { x: 0, y: 0 }
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Gradient Blobs */}
      <div
        className="absolute w-96 h-96 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-morph-blob"
        style={{ top: '5%', left: '10%', animationDuration: '25s' }}
      />
      <div
        className="absolute w-80 h-80 bg-gradient-to-br from-rose-400/25 to-pink-400/25 rounded-full blur-3xl animate-morph-blob"
        style={{ top: '60%', right: '5%', animationDuration: '30s', animationDelay: '5s' }}
      />
      <div
        className="absolute w-72 h-72 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-morph-blob"
        style={{ bottom: '10%', left: '5%', animationDuration: '28s', animationDelay: '3s' }}
      />

      {/* Floating Particles */}
      {particles.map((particle, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-orange-400 to-amber-400 animate-float-particle"
          style={{
            width: particle.size + 'px',
            height: particle.size + 'px',
            left: particle.x + '%',
            top: particle.y + '%',
            animationDuration: particle.duration + 's',
            animationDelay: particle.delay + 's',
            opacity: particle.opacity,
            boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
      ))}

      {/* Floating Hearts */}
      {floatingHearts.map((heart, i) => (
        <Heart
          key={`heart-${i}`}
          className="absolute text-rose-400 animate-float-heart"
          size={heart.size}
          style={{
            left: heart.x + '%',
            top: heart.y + '%',
            animationDuration: heart.duration + 's',
            animationDelay: heart.delay + 's',
            fill: 'rgba(251, 113, 133, 0.3)',
            stroke: 'rgba(251, 113, 133, 0.6)',
            transform: `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
          }}
        />
      ))}

      {/* Stars */}
      {stars.map((star, i) => (
        <Star
          key={`star-${i}`}
          className="absolute text-amber-400 animate-twinkle"
          size={star.size}
          style={{
            left: star.x + '%',
            top: star.y + '%',
            animationDuration: star.duration + 's',
            animationDelay: star.delay + 's',
            fill: 'currentColor',
            transform: `translate(${mousePosition.x * 0.008}px, ${mousePosition.y * 0.008}px)`
          }}
        />
      ))}

      {/* Decorative Rings */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 opacity-30">
        <div className="absolute inset-0 rounded-full border-2 border-orange-300/40 animate-pulse-ring"></div>
        <div className="absolute inset-0 rounded-full border-2 border-amber-300/40 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid Pattern with Mouse Movement */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 146, 60, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 146, 60, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
        }}
      />

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

    </div>
  );
};

export default DashboardBackground;