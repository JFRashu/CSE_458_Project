export const footerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&display=swap');

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

  @keyframes float-icon {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
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

  @keyframes shimmer {
    0% {
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }

  .footer-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #f5f1ed 100%);
  }

  .glass-footer {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px) saturate(180%);
    border-top: 1px solid rgba(251, 146, 60, 0.1);
  }

  .footer-link {
    position: relative;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: #374151;
  }

  .footer-link::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #fb923c, #ea580c);
    transition: width 0.3s ease;
  }

  .footer-link:hover::before {
    width: 100%;
  }

  .footer-link:hover {
    color: #ea580c;
  }

  .social-icon {
    transition: all 0.3s ease;
    color: #6b7280;
  }

  .social-icon:hover {
    color: #ea580c;
    transform: translateY(-4px);
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #4b5563;
    font-size: 14px;
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }

  .animate-float-icon {
    animation: float-icon 3s ease-in-out infinite;
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