import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { Router, Route } from './components/Router';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ErrorTest from './pages/ErrorTest';

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Navbar />
          <Route path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/error-test" component={ErrorTest} />

          {/* Footer Component */}
         {/* Footer Component */}
        <Footer />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;