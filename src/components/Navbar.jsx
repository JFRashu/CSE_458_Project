import { useState } from 'react';
import { Heart, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ navigate }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Heart className="text-pink-400 mr-2" size={28} />
            <span className="text-white font-bold text-xl">MindfulSpace</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-white hover:text-pink-400 px-3 py-2 rounded-lg transition-colors"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="text-white hover:text-pink-400 px-3 py-2 rounded-lg transition-colors"
                >
                  Emotions
                </button>
                <div className="flex items-center space-x-3 pl-3 border-l border-white/20">
                  <span className="text-white text-sm">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-white hover:text-pink-400 px-4 py-2 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                  className="block w-full text-left text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { navigate('/'); setIsOpen(false); }}
                  className="block w-full text-left text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                  Emotions
                </button>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-white text-sm px-3 py-2">Hi, {user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500/20 text-red-300 px-3 py-2 rounded-lg flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="block w-full text-left text-white hover:bg-white/10 px-3 py-2 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/register'); setIsOpen(false); }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-2 rounded-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;