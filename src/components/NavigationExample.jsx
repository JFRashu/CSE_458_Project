import React from 'react';
import { useNavigate } from '../utils/navigation';

const NavigationExample = () => {
  const navigate = useNavigate();

  const handleNavigation = (path, options = {}) => {
    navigate(path, options);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-slate-700 mb-4">Navigation Examples</h2>

      <div className="space-y-3">
        <button
          onClick={() => handleNavigation('/')}
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to Home
        </button>

        <button
          onClick={() => handleNavigation('/dashboard')}
          className="block w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to Dashboard
        </button>

        <button
          onClick={() => handleNavigation('/login', { replace: true })}
          className="block w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to Login (Replace History)
        </button>

        <button
          onClick={() => handleNavigation('/register', {
            state: { from: 'example', timestamp: Date.now() }
          })}
          className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to Register (With State)
        </button>

        <button
          onClick={() => handleNavigation('/user/123')}
          className="block w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Go to User Profile (Dynamic Route)
        </button>
      </div>

      <div className="mt-6 p-4 bg-slate-100 rounded-lg">
        <h3 className="font-semibold text-slate-700 mb-2">Navigation Functions Available:</h3>
        <ul className="text-sm text-slate-600 space-y-1">
          <li>• <code>navigate(path)</code> - Basic navigation</li>
          <li>• <code>navigate(path, {'{replace: true}'})</code> - Replace history</li>
          <li>• <code>navigate(path, {'{state: data}'})</code> - Pass state data</li>
          <li>• <code>useNavigate()</code> - Hook for functional components</li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationExample;