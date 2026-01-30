export const navbarStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&display=swap');

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gradient-shift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(251, 146, 60, 0.3), 0 0 40px rgba(251, 146, 60, 0.1);
    }
    50% {
      box-shadow: 0 0 30px rgba(251, 146, 60, 0.5), 0 0 60px rgba(251, 146, 60, 0.2);
    }
  }

  @keyframes float-badge {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  .animate-slide-down {
    animation: slide-down 0.3s ease-out forwards;
  }

  .animate-gradient-shift {
    background-size: 200% 200%;
    animation: gradient-shift 3s ease infinite;
  }

  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }

  .animate-float-badge {
    animation: float-badge 2s ease-in-out infinite;
  }

  .glass-nav {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 1px solid rgba(251, 146, 60, 0.1);
  }

  .glass-nav-scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(25px) saturate(200%);
    border-bottom: 1px solid rgba(251, 146, 60, 0.2);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .nav-link {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .nav-link::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%) scaleX(0);
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #fb923c, #ea580c);
    border-radius: 2px;
    transition: transform 0.3s ease;
  }

  .nav-link:hover::before,
  .nav-link.active::before {
    transform: translateX(-50%) scaleX(1);
  }

  .nav-link:hover {
    color: #ea580c;
  }

  .mobile-menu {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(30px) saturate(200%);
  }

  .profile-badge {
    background: linear-gradient(135deg, #fb923c 0%, #ea580c 100%);
    position: relative;
    overflow: hidden;
  }

  .profile-badge::before {
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
    animation: shimmer 3s infinite;
  }
`;