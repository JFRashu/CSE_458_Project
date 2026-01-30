import React from 'react';
import { useNavigate } from '../utils/navigation';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console (you can also log to an error reporting service)
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Use a functional component to access the navigate hook
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

// Separate functional component to use the navigate hook
const ErrorFallback = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to home page after a brief delay to show the error message
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-6">We're redirecting you to the home page...</p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default ErrorBoundary;