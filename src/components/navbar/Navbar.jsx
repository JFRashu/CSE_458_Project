import { useState, useEffect } from 'react';
import { Heart, Menu, X, User, LogOut, Settings, BarChart3, Sparkles, Home, Trophy } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from '../../utils/navigation';
import { navbarStyles } from './NavbarStyle';
import { LogoSection } from './LogoSection';
import { DesktopNavigationLinks } from './DesktopNavigationLinks';
import { ProfileDropdown } from './ProfileDropdown';
import { DesktopAuthButtons } from './DesktopAuthButtons';
import { MobileAuthSection } from './MobileAuthSection';

const Navbar = ({ navigate: propNavigate }) => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate() || propNavigate;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);


  const [activeLink, setActiveLink] = useState(() => {
    const path = window.location.pathname;
    return path === '/dashboard' ? 'dashboard' : 'home';
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLogout = () => {
    // delete all environment variables related to user session

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
    ];

  return (
    <>
      <style>{navbarStyles}</style>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav-scrolled' : 'glass-nav'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo Section */}
            <LogoSection navigate={navigate} setActiveLink={setActiveLink} />

            {/* Desktop Navigation Links */}

            <DesktopNavigationLinks menuItems={menuItems} activeLink={activeLink} setActiveLink={setActiveLink} navigate={navigate} />
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="relative">
                  <DesktopAuthButtons user={user} setIsProfileOpen={setIsProfileOpen} />

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <ProfileDropdown user={user} navigate={navigate} setActiveLink={setActiveLink} setIsProfileOpen={setIsProfileOpen} handleLogout={handleLogout} />
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
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${isActive
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
              <MobileAuthSection isAuthenticated={isAuthenticated} user={user} navigate={navigate} setIsMenuOpen={setIsMenuOpen} handleLogout={handleLogout} />
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