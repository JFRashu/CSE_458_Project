export const dashboardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

  @keyframes float-particle {
    0%, 100% {
      transform: translateY(0) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% {
      transform: translateY(-100vh) translateX(30px) rotate(180deg);
      opacity: 0;
    }
  }

  @keyframes float-heart {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @keyframes morph-blob {
    0%, 100% {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
      transform: translate(10px, -10px) rotate(5deg);
    }
    50% {
      border-radius: 70% 30% 50% 50% / 30% 70% 60% 40%;
      transform: translate(-10px, 10px) rotate(-5deg);
    }
    75% {
      border-radius: 40% 60% 30% 70% / 60% 40% 50% 60%;
      transform: translate(5px, 5px) rotate(3deg);
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.95);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.2;
    }
    100% {
      transform: scale(0.95);
      opacity: 0.5;
    }
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

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes bar-grow {
    from {
      transform: scaleY(0);
    }
    to {
      transform: scaleY(1);
    }
  }

  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(251, 146, 60, 0.5);
    }
    50% {
      box-shadow: 0 0 30px rgba(251, 146, 60, 0.8);
    }
  }

  .animate-float-particle {
    animation: float-particle linear infinite;
  }

  .animate-float-heart {
    animation: float-heart linear infinite;
  }

  .animate-twinkle {
    animation: twinkle ease-in-out infinite;
  }

  .animate-morph-blob {
    animation: morph-blob ease-in-out infinite;
  }

  .animate-pulse-ring {
    animation: pulse-ring 3s ease-in-out infinite;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }

  .glass-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.6);
  }

  .glass-morphism {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  .shimmer-bg {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    background-size: 1000px 100%;
    animation: shimmer 3s infinite;
  }

  .bar-chart-item {
    transform-origin: bottom;
    animation: bar-grow 0.6s ease-out forwards;
  }

  .cursor-pointer:hover {
    transform: translateY(-2px);
  }

  .stat-card:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .card-3d {
    perspective: 1000px;
    transition: all 0.3s ease;
  }

  .card-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  .card-shine:hover::before {
    left: 100%;
  }
`;