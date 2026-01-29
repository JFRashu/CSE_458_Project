export const homePageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&family=Lora:ital@0;1&display=swap');
  
  @keyframes float-up {
    0% {
      transform: translateY(100vh) scale(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) scale(1);
      opacity: 0;
    }
  }
  
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes pulse-scale {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.1); opacity: 0.5; }
  }
  
  @keyframes wave {
    0%, 100% { 
      transform: translateY(0) translateX(0); 
    }
    25% { 
      transform: translateY(-20px) translateX(10px); 
    }
    75% { 
      transform: translateY(20px) translateX(-10px); 
    }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  
  @keyframes float-gentle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  
  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 0 20px rgba(251, 146, 60, 0.3); }
    50% { box-shadow: 0 0 40px rgba(251, 146, 60, 0.6); }
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes morph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50% { border-radius: 70% 30% 50% 50% / 30% 70% 60% 40%; }
    75% { border-radius: 40% 60% 30% 70% / 60% 40% 50% 60%; }
  }

  @keyframes float-diagonal {
    0%, 100% { 
      transform: translate(0, 0) rotate(0deg);
    }
    25% { 
      transform: translate(20px, -20px) rotate(5deg);
    }
    50% { 
      transform: translate(0, -40px) rotate(0deg);
    }
    75% { 
      transform: translate(-20px, -20px) rotate(-5deg);
    }
  }

  @keyframes sparkle {
    0%, 100% { 
      opacity: 0;
      transform: scale(0);
    }
    50% { 
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes drift {
    0% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(30px, -30px);
    }
    66% {
      transform: translate(-20px, 20px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      filter: drop-shadow(0 0 5px rgba(251, 146, 60, 0.5));
    }
    50% {
      filter: drop-shadow(0 0 20px rgba(251, 146, 60, 0.8));
    }
  }

  @keyframes twinkle {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(1.2);
    }
  }
  
  .animate-float-up {
    animation: float-up linear infinite;
  }
  
  .animate-rotate-slow {
    animation: rotate-slow linear infinite;
  }
  
  .animate-pulse-scale {
    animation: pulse-scale ease-in-out infinite;
  }
  
  .animate-wave {
    animation: wave ease-in-out infinite;
  }
  
  .animate-morph {
    animation: morph ease-in-out infinite;
  }
  
  .animate-float-gentle {
    animation: float-gentle 4s ease-in-out infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 3s infinite;
  }
  
  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .animate-float-diagonal {
    animation: float-diagonal ease-in-out infinite;
  }

  .animate-sparkle {
    animation: sparkle ease-in-out infinite;
  }

  .animate-drift {
    animation: drift ease-in-out infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow ease-in-out infinite;
  }

  .animate-twinkle {
    animation: twinkle ease-in-out infinite;
  }
  
  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
  .delay-600 { animation-delay: 0.6s; }
  
  .glass-morphism {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }
  
  .card-3d {
    transform-style: preserve-3d;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  }
  
  .card-3d:hover {
    transform: translateY(-12px) rotateX(5deg);
  }
  
  .card-shine {
    position: relative;
    overflow: hidden;
  }
  
  .card-shine::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%
    );
    transform: rotate(45deg);
    transition: all 0.6s;
    opacity: 0;
  }
  
  .card-shine:hover::before {
    opacity: 1;
    animation: shimmer 1.5s;
  }
  
  .mesh-gradient {
    background: 
      radial-gradient(at 27% 37%, rgba(251, 146, 60, 0.2) 0px, transparent 50%),
      radial-gradient(at 97% 21%, rgba(234, 88, 12, 0.2) 0px, transparent 50%),
      radial-gradient(at 52% 99%, rgba(249, 115, 22, 0.2) 0px, transparent 50%),
      radial-gradient(at 10% 29%, rgba(251, 191, 36, 0.2) 0px, transparent 50%),
      radial-gradient(at 97% 96%, rgba(217, 119, 6, 0.2) 0px, transparent 50%),
      radial-gradient(at 33% 50%, rgba(245, 158, 11, 0.2) 0px, transparent 50%),
      radial-gradient(at 79% 53%, rgba(251, 146, 60, 0.2) 0px, transparent 50%);
  }
`;
