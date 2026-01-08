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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <Heart className="text-blue-500 mr-2" size={28} />
            <span className="text-slate-700 font-bold text-xl">MindfulSpace</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors font-medium"
                >
                  Emotions
                </button>
                <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
                  <span className="text-slate-600 text-sm font-medium">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-all flex items-center gap-2 border border-red-200"
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
                  className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all font-medium shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200">
          <div className="px-4 py-3 space-y-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => { navigate('/dashboard'); setIsOpen(false); }}
                  className="block w-full text-left text-slate-600 hover:bg-slate-100 px-3 py-2 rounded-lg"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { navigate('/'); setIsOpen(false); }}
                  className="block w-full text-left text-slate-600 hover:bg-slate-100 px-3 py-2 rounded-lg"
                >
                  Emotions
                </button>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-slate-600 text-sm px-3 py-2">Hi, {user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-50 text-red-600 px-3 py-2 rounded-lg flex items-center gap-2 border border-red-200"
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
                  className="block w-full text-left text-slate-600 hover:bg-slate-100 px-3 py-2 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/register'); setIsOpen(false); }}
                  className="w-full bg-blue-500 text-white px-3 py-2 rounded-lg"
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