import { useState } from 'react';
import { Heart, Mail, Lock, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../utils/navigation';
import { loginPageStyle } from '../components/login/loginPageStyle';
import { AnimatedBackground } from '../components/registration/AnimatedBackground';
import { LoginCardHeader } from '../components/login/LoginCardHeader';
import { LoginBootomInfo } from '../components/login/LoginBootomInfo';
import { LoginDivider } from '../components/login/LoginDivider';
import { CreateAccountButton } from '../components/login/CreateAccountButton';

const LoginPage = ({ navigate : propNavigate}) => {
  const navigate = useNavigate() || propNavigate;
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message,setMessage] = useState("New to MindfulSpace?");
  const [buttonMessage,setButtonMessage] = useState("Create an Account →");
  const [bottomInfo,setBottomInfo] = useState("Protected by advanced security measures");

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

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);

    setBottomInfo(bottomInfo);
    setButtonMessage(buttonMessage);
    setMessage(message);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate async operation
    setTimeout(() => {
      if (login(email, password)) {
        navigate('/dashboard');
        
      } else {
        setError('Invalid credentials. Please try again.');
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
      <style>{loginPageStyle}</style>

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center p-4 pt-20">
        
        {/* Animated Background */}
        {<AnimatedBackground particles={particles} />}

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md animate-fade-in-up">
          <div className="glass-card rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Card Header with Gradient */}
            <LoginCardHeader/>

            {/* Card Body */}
            <div className="p-8 -mt-6 relative">
              {/* White curve overlay */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-white rounded-t-3xl"></div>
              
              <div className="space-y-5 relative" onKeyPress={handleKeyPress}>
                
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg shadow-sm animate-fade-in-up">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <p className="font-medium text-sm">{error}</p>
                    </div>
                  </div>
                )}

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
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    onClick={() => navigate('/forgot-password')}
                    className="text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
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
                        Logging in...
                      </>
                    ) : (
                      <>
                        Login to Continue
                        <Sparkles size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </button>

                {/* Divider */}
               <LoginDivider Message={message}/>
                {/* Sign Up Link */}
                <CreateAccountButton onClick={() => navigate('/register')} buttonMessage={buttonMessage} />
              </div>
            </div>
          </div>

          {/* Bottom Info */}
          <LoginBootomInfo bottomInfo={bottomInfo}/> 
        </div>
   
      </div>
   
    </>
  );
};

export default LoginPage;