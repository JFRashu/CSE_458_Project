import { useState, useEffect } from 'react';
import { Heart, Menu, LogOut, X, User, LayoutDashboard, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ navigate }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
    setShowUserMenu(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&display=swap');
        
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
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(251, 146, 60, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(251, 146, 60, 0.5);
          }
        }
        
        .nav-glass {
          background: rgba(255, 255, 255, ${scrolled ? '0.95' : '0.85'});
          backdrop-filter: blur(${scrolled ? '30px' : '20px'}) saturate(180%);
          border-bottom: 1px solid rgba(251, 146, 60, ${scrolled ? '0.2' : '0.1'});
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transform: translateX(-50%);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .mobile-menu-bg {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(30px) saturate(180%);
        }
      `}</style>

      <nav 
        className={`fixed top-0 left-0 right-0 z-50 nav-glass shadow-lg transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => navigate('/')}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 p-2.5 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                  <Heart className="text-white" size={22} strokeWidth={2.5} />
                </div>
              </div>
              
              <span 
                className="ml-3 text-gray-800 font-bold text-xl tracking-tight group-hover:text-orange-600 transition-colors"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                MindfulSpace
              </span>
              
              {/* Beta badge */}
              <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                Beta
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="nav-link flex items-center gap-2 text-gray-700 hover:text-orange-600 px-4 py-2 rounded-xl transition-all font-semibold text-sm hover:bg-orange-50"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <LayoutDashboard size={18} strokeWidth={2} />
                    Dashboard
                  </button>
                  
                  <button
                    onClick={() => navigate('/')}
                    className="nav-link flex items-center gap-2 text-gray-700 hover:text-orange-600 px-4 py-2 rounded-xl transition-all font-semibold text-sm hover:bg-orange-50"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <Sparkles size={18} strokeWidth={2} />
                    Emotions
                  </button>
                  
                  {/* User Menu */}
                  <div className="relative ml-2">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 rounded-xl transition-all border border-orange-200/50 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                          <User size={16} className="text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-gray-800 font-semibold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {user.name}
                        </span>
                      </div>
                    </button>
                    
                    {/* Dropdown */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-orange-100 overflow-hidden animate-slide-down">
                        <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-b border-orange-100">
                          <p className="text-sm text-gray-600 mb-1">Signed in as</p>
                          <p className="text-base font-bold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {user.name}
                          </p>
                        </div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all font-semibold text-sm"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          <LogOut size={18} strokeWidth={2} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="nav-link text-gray-700 hover:text-orange-600 px-4 py-2 rounded-xl transition-all font-semibold text-sm hover:bg-orange-50"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Login
                  </button>
                  
                  <button
                    onClick={() => navigate('/register')}
                    className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-2.5 rounded-xl transition-all font-semibold shadow-lg hover:shadow-xl text-sm group"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <span className="relative z-10">Sign Up Free</span>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-10 h-10 bg-orange-50 hover:bg-orange-100 text-orange-600 rounded-xl transition-all flex items-center justify-center shadow-md"
            >
              {isOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mobile-menu-bg border-t border-orange-200/30 shadow-xl animate-slide-down">
            <div className="px-4 py-4 space-y-2">
              {isAuthenticated ? (
                <>
                  {/* User Info Card */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-3 border border-orange-200/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-md">
                        <User size={20} className="text-white" strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-0.5">Welcome back,</p>
                        <p className="text-base font-bold text-gray-800" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                    className="flex items-center gap-3 w-full text-left text-gray-700 hover:bg-orange-50 px-4 py-3 rounded-xl transition-all font-semibold"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <LayoutDashboard size={20} strokeWidth={2} />
                    Dashboard
                  </button>
                  
                  <button
                    onClick={() => { navigate('/'); setIsOpen(false); }}
                    className="flex items-center gap-3 w-full text-left text-gray-700 hover:bg-orange-50 px-4 py-3 rounded-xl transition-all font-semibold"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <Sparkles size={20} strokeWidth={2} />
                    Emotions
                  </button>
                  
                  <div className="pt-2 mt-2 border-t border-orange-200/50">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl transition-all font-semibold border border-red-200"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      <LogOut size={20} strokeWidth={2} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { navigate('/login'); setIsOpen(false); }}
                    className="block w-full text-left text-gray-700 hover:bg-orange-50 px-4 py-3 rounded-xl transition-all font-semibold"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Login
                  </button>
                  
                  <button
                    onClick={() => { navigate('/register'); setIsOpen(false); }}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-3 rounded-xl transition-all font-semibold shadow-lg"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;