import { useEffect } from 'react';
import { Activity, Calendar, TrendingUp, Award, Sun, Waves, Wind } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = ({ navigate }) => {
  const { user, isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const stats = [
    { icon: Activity, label: 'Check-ins', value: '24', color: 'from-pink-500 to-rose-500' },
    { icon: Calendar, label: 'Streak', value: '7 days', color: 'from-purple-500 to-indigo-500' },
    { icon: TrendingUp, label: 'Improvement', value: '+15%', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Achievements', value: '5', color: 'from-emerald-500 to-green-500' }
  ];

  const recentEmotions = [
    { emotion: 'Happy', time: '2 hours ago', icon: Sun, color: 'text-green-400' },
    { emotion: 'Calm', time: '5 hours ago', icon: Waves, color: 'text-blue-400' },
    { emotion: 'Anxious', time: 'Yesterday', icon: Wind, color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {user?.name}! 👋</h1>
          <p className="text-white/70 text-lg">Here's your wellness overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <p className="text-white/70 text-sm mb-1">{stat.label}</p>
                <p className="text-white text-3xl font-bold">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Check-ins</h2>
            <div className="space-y-4">
              {recentEmotions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                    <Icon className={item.color} size={32} />
                    <div className="flex-1">
                      <p className="text-white font-semibold">{item.emotion}</p>
                      <p className="text-white/60 text-sm">{item.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg transform hover:scale-[1.02]"
              >
                Check Your Emotions
              </button>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-4 rounded-xl transition-all border border-white/20">
                View Progress
              </button>
              <button className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-4 rounded-xl transition-all border border-white/20">
                Set Goals
              </button>
            </div>
          </div>
        </div>

        {/* Mood Insight */}
        <div className="mt-6 bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-xl rounded-2xl p-6 border border-pink-500/30">
          <h3 className="text-xl font-bold text-white mb-2">💡 Today's Insight</h3>
          <p className="text-white/90">
            You've been consistently checking in for 7 days! Your emotional awareness is improving. 
            Keep up the great work on your wellness journey!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;