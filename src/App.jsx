import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Router, Route } from './components/Router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Route path="/" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/dashboard" component={DashboardPage} />
      </Router>
    </AuthProvider>
  );
};

export default App;