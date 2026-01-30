import { useState } from 'react';
import { User, Mail, Lock, Sparkles, Eye, EyeOff, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/footer/Footer';
import { useNavigate } from '../utils/navigation';

const RegisterPage = ({ navigate: propNavigate }) => {
  const navigate = useNavigate() || propNavigate;
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate floating particles once on mount
  const [particles] = useState(() =>
    [...Array(40)].map(() => ({
      width: Math.random() * 6 + 3,
      height: Math.random() * 6 + 3,
      left: Math.random() * 100,
      animationDuration: Math.random() * 20 + 15,
      animationDelay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  );

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    if (strength <= 2) return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    if (strength <= 3) return { strength: 66, label: 'Medium', color: 'bg-yellow-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    // Simulate async operation
    setTimeout(() => {
      if (register(email, password, name)) {
        navigate('/dashboard');
      } else {
        setError('Registration failed. Email may already be in use.');
        setIsLoading(false);
      }
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Outfit:wght@400;500;600;700&family=Lora:ital@0;1&display=swap');
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
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
            opacity: 0.7;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.3;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.7;
          }
        }
        
        @keyframes shimmer-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes check-bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
        
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
        
        .animate-morph-blob {
          animation: morph-blob ease-in-out infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 2s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-check-bounce {
          animation: check-bounce 0.5s ease-in-out;
        }
        
        .input-glow:focus {
          box-shadow: 0 0 0 3px rgba(251, 146, 60, 0.1);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(30px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        
        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }
        
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          animation: shimmer-line 2s infinite;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4 pt-20 pb-10">

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Blobs */}
          <div
            className="absolute w-96 h-96 bg-gradient-to-br from-orange-400/40 to-amber-400/40 rounded-full blur-3xl animate-morph-blob"
            style={{ top: '10%', left: '5%', animationDuration: '20s' }}
          />
          <div
            className="absolute w-80 h-80 bg-gradient-to-br from-amber-400/30 to-orange-500/30 rounded-full blur-3xl animate-morph-blob"
            style={{ bottom: '15%', right: '10%', animationDuration: '25s', animationDelay: '5s' }}
          />
          <div
            className="absolute w-72 h-72 bg-gradient-to-br from-rose-400/25 to-orange-400/25 rounded-full blur-3xl animate-morph-blob"
            style={{ top: '50%', right: '5%', animationDuration: '30s', animationDelay: '10s' }}
          />

          {/* Floating Particles */}
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-orange-400 to-amber-400 animate-float-particle"
              style={{
                width: particle.width + 'px',
                height: particle.height + 'px',
                left: particle.left + '%',
                bottom: '-20px',
                animationDuration: particle.animationDuration + 's',
                animationDelay: particle.animationDelay + 's',
                opacity: particle.opacity,
                boxShadow: '0 0 10px rgba(251, 146, 60, 0.5)'
              }}
            />
          ))}

          {/* Decorative Rings */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64">
            <div className="absolute inset-0 rounded-full border-2 border-orange-300/30 animate-pulse-ring"></div>
            <div className="absolute inset-0 rounded-full border-2 border-amber-300/30 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(251, 146, 60, 0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(251, 146, 60, 0.5) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        {/* Register Card */}
        <div className="relative z-10 w-full max-w-md animate-fade-in-up">
          <div className="glass-card rounded-3xl shadow-2xl overflow-hidden">

            {/* Card Header with Gradient */}
            <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 p-8 pb-12">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

              <div className="relative text-center">
                {/* Logo with Animation */}
                <div className="inline-block mb-4 relative">
                  <div className="absolute inset-0 rounded-full bg-white/30 animate-pulse-ring"></div>
                  <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
                  <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                    <User className="text-orange-600" size={40} strokeWidth={2.5} />
                  </div>
                </div>

                <h2
                  className="text-4xl font-bold text-white mb-2 tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Create Account
                </h2>
                <p className="text-orange-100 text-base font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Start your wellness journey today
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8 -mt-6 relative">
              {/* White curve overlay */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-white rounded-t-3xl"></div>

              <div className="space-y-4 relative" onKeyPress={handleKeyPress}>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-sm animate-fade-in-up">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p className="font-medium text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Name Input */}
                <div className="space-y-2">
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 input-glow transition-all"
                      placeholder="John Doe"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 input-glow transition-all"
                      placeholder="your@email.com"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 input-glow transition-all"
                      placeholder="••••••••"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 font-medium">Password Strength</span>
                        <span className={`text-xs font-bold ${passwordStrength.label === 'Weak' ? 'text-red-600' :
                            passwordStrength.label === 'Medium' ? 'text-yellow-600' :
                              'text-green-600'
                          }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} rounded-full transition-all duration-500`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <label
                    className="block text-gray-700 font-semibold text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400" size={20} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl pl-12 pr-12 py-3.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400 input-glow transition-all"
                      placeholder="••••••••"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {confirmPassword && password === confirmPassword && (
                      <CheckCircle2 className="absolute right-12 top-1/2 transform -translate-y-1/2 text-green-500 animate-check-bounce" size={20} />
                    )}
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <Shield className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    By creating an account, you agree to our{' '}
                    <button onClick={() => navigate('/terms')} className="text-orange-600 hover:text-orange-700 font-semibold">
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button onClick={() => navigate('/privacy')} className="text-orange-600 hover:text-orange-700 font-semibold">
                      Privacy Policy
                    </button>
                  </p>
                </div>

                {/* Register Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="shimmer-effect relative w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create My Account
                        <Sparkles size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </button>

                {/* Divider */}
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Already have an account?
                    </span>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-base transition-all hover:gap-3"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Login Instead
                    <span className="text-xl">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
              🔒 Your data is protected with 256-bit encryption
            </p>
          </div>
        </div>
      </div>
      {/* Footer Component */}
      <Footer navigate={navigate} />
    </>
  );
};

export default RegisterPage;