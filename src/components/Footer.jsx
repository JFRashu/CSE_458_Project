import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useNavigate } from '../utils/navigation';

const Footer = ({ navigate: propNavigate }) => {
  const navigate = useNavigate() || propNavigate;

  const footerLinks = {
    Product: [
      { name: 'Features', path: '/#features' },
      { name: 'Pricing', path: '/#pricing' },
      { name: 'Security', path: '/#security' },
    ],
    Resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Documentation', path: '/docs' },
      { name: 'Support', path: '/support' },
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Linkedin, label: 'LinkedIn', url: '#' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'hello@mindfulspace.com' },
    { icon: Phone, text: '+1 (555) 123-4567' },
    { icon: MapPin, text: '123 Wellness Street, Happy City, HC 12345' },
  ];

  return (
    <>
      <style>{`
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>

      <footer className="glass-footer mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 animate-fade-in-up">
              <div 
                className="flex items-center space-x-2 mb-6 cursor-pointer group"
                onClick={() => navigate('/')}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 animate-ping"></div>
                  <div className="relative profile-badge p-2 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-110 animate-float-icon">
                    <Heart className="text-white" size={20} strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h3 
                    className="text-lg font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-gray-800 bg-clip-text text-transparent"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    MindfulSpace
                  </h3>
                  <p className="text-xs text-orange-600 font-semibold">Wellness</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Nurturing emotional wellness, one moment at a time. Your journey to mental peace starts here.
              </p>
            </div>

            {/* Product Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h4 
                className="text-gray-900 font-bold text-sm mb-6 uppercase tracking-wider" 
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.Product.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="footer-link text-sm font-medium"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 
                className="text-gray-900 font-bold text-sm mb-6 uppercase tracking-wider" 
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.Resources.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="footer-link text-sm font-medium"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 
                className="text-gray-900 font-bold text-sm mb-6 uppercase tracking-wider" 
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.Company.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="footer-link text-sm font-medium"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h4 
                className="text-gray-900 font-bold text-sm mb-6 uppercase tracking-wider" 
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Contact
              </h4>
              <div className="space-y-3">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="contact-item">
                      <Icon size={16} className="text-orange-600 flex-shrink-0" />
                      <span style={{ fontFamily: "'Outfit', sans-serif" }}>{info.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-orange-100 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Copyright */}
            <p className="text-gray-600 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              © 2026 MindfulSpace. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    className="social-icon transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/privacy')}
                className="footer-link text-sm font-medium"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Privacy
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="footer-link text-sm font-medium"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Terms
              </button>
              <button
                onClick={() => navigate('/cookies')}
                className="footer-link text-sm font-medium"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
