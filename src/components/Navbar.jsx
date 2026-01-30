import { useState, useEffect } from 'react';
import { Heart, Menu, X, User, LogOut, Settings, BarChart3, Sparkles, Home, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../utils/navigation';

const Navbar = ({ navigate: propNavigate }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate() || propNavigate;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const menuItems = isAuthenticated
    ? [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
      ]
    : [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Features', path: '/#features', icon: Sparkles },
      
      ];

  return (
    <>
      <style>{`
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
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
      `}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav-scrolled' : 'glass-nav'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => {
                navigate('/');
                setActiveLink('home');
              }}
            >
              {/* Animated Logo Container */}
              <div className="relative">
                {/* Pulsing Background Rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 opacity-20 animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 opacity-10 animate-pulse"></div>
                
                {/* Main Logo */}
                <div className="relative profile-badge p-2 rounded-xl shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Heart className="text-white" size={24} strokeWidth={2.5} />
                </div>
              </div>
              
              {/* Brand Name */}
              <div className="flex flex-col">
                <span 
                  className="text-xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-gray-800 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  MindfulSpace
                </span>
                <span className="text-[10px] text-orange-600 font-semibold tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Emotional Wellness
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeLink === item.name.toLowerCase();
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setActiveLink(item.name.toLowerCase());
                    }}
                    className={`nav-link ${isActive ? 'active' : ''} px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 transition-all flex items-center gap-2 group`}
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <Icon size={16} className={`transition-all ${isActive ? 'text-orange-600' : 'text-gray-500'} group-hover:text-orange-600`} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 hover:border-orange-300 transition-all group"
                  >
                    {/* User Avatar */}
                    <div className="relative">
                      <div className="profile-badge w-9 h-9 rounded-full flex items-center justify-center shadow-md">
                        <User size={18} className="text-white" strokeWidth={2.5} />
                      </div>
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-float-badge"></div>
                    </div>
                    
                    {/* User Info */}
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {user?.name || 'User'}
                      </span>
                      <span className="text-xs text-orange-600 font-medium">View Profile</span>
                    </div>
                    
                    {/* Dropdown Arrow */}
                    <svg 
                      className={`w-4 h-4 text-orange-600 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 animate-slide-down">
                      <div className="bg-white rounded-2xl shadow-2xl border border-orange-100 overflow-hidden">
                        {/* Dropdown Header */}
                        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <User size={22} className="text-orange-600" strokeWidth={2.5} />
                            </div>
                            <div>
                              <p className="text-white font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                {user?.name || 'User'}
                              </p>
                              <p className="text-orange-100 text-xs">{user?.email || 'user@email.com'}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Dropdown Menu Items */}
                        <div className="p-2">
                          <button
                            onClick={() => {
                              navigate('/dashboard');
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group"
                          >
                            <BarChart3 size={18} className="text-orange-600" />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Dashboard
                            </span>
                          </button>
                          
                          <button
                            onClick={() => {
                              navigate('/settings');
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group"
                          >
                            <Settings size={18} className="text-orange-600" />
                            <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-600" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Settings
                            </span>
                          </button>
                          
                          <div className="my-2 border-t border-gray-200"></div>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all group"
                          >
                            <LogOut size={18} className="text-red-600" />
                            <span className="text-sm font-semibold text-red-600 group-hover:text-red-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Logout
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 transition-all border border-transparent hover:border-orange-200"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Login
                  </button>
                  
                  <button
                    onClick={() => navigate('/register')}
                    className="relative overflow-hidden px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 animate-glow-pulse group"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <Sparkles size={14} className="group-hover:rotate-180 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-orange-50 transition-all"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu border-t border-orange-100 animate-slide-down">
            <div className="px-4 py-6 space-y-3">
              {/* Mobile Navigation Links */}
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeLink === item.name.toLowerCase();
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setActiveLink(item.name.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-100 to-amber-100 border-2 border-orange-300' 
                        : 'hover:bg-orange-50 border-2 border-transparent'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-orange-600' : 'text-gray-600'} />
                    <span className={`font-semibold ${isActive ? 'text-orange-600' : 'text-gray-700'}`} style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {item.name}
                    </span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                    )}
                  </button>
                );
              })}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAuthenticated ? (
                  <>
                    {/* Mobile User Info */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center space-x-3">
                        <div className="profile-badge w-12 h-12 rounded-full flex items-center justify-center shadow-md">
                          <User size={22} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {user?.name || 'User'}
                          </p>
                          <p className="text-xs text-orange-600">{user?.email || 'user@email.com'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all border-2 border-transparent hover:border-orange-200"
                    >
                      <BarChart3 size={20} className="text-orange-600" />
                      <span className="font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Dashboard
                      </span>
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate('/settings');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all border-2 border-transparent hover:border-orange-200"
                    >
                      <Settings size={20} className="text-orange-600" />
                      <span className="font-semibold text-gray-700" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Settings
                      </span>
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-red-50 hover:bg-red-100 transition-all border-2 border-red-200"
                    >
                      <LogOut size={20} className="text-red-600" />
                      <span className="font-semibold text-red-600" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Logout
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-5 py-3 rounded-xl text-sm font-semibold text-gray-700 bg-white border-2 border-orange-200 hover:bg-orange-50 transition-all"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Login
                    </button>
                    
                    <button
                      onClick={() => {
                        navigate('/register');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Get Started
                      <Sparkles size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for profile dropdown */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;