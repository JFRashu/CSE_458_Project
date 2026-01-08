import { useContext, createContext } from 'react';

// Create a navigation context
const NavigationContext = createContext();

// Custom hook to use navigation
export const useNavigate = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigate must be used within a NavigationProvider');
  }
  return context.navigate;
};

// Navigation provider component
export const NavigationProvider = ({ children, navigate }) => {
  return (
    <NavigationContext.Provider value={{ navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Navigation utility functions
export const navigationUtils = {
  // Navigate to a specific path
  goTo: (navigate, path) => {
    if (navigate) {
      navigate(path);
    }
  },

  // Go back (if browser history is available)
  goBack: () => {
    if (window.history.length > 1) {
      window.history.back();
    }
  },

  // Go forward (if browser history is available)
  goForward: () => {
    window.history.forward();
  },

  // Replace current history entry
  replace: (navigate, path) => {
    if (navigate) {
      // For now, just navigate (in a real app, this would replace history)
      navigate(path);
    }
  },

  // Navigate with state
  goToWithState: (navigate, path, state) => {
    if (navigate) {
      // Store state in sessionStorage for simple state management
      if (state) {
        sessionStorage.setItem(`nav_state_${path}`, JSON.stringify(state));
      }
      navigate(path);
    }
  },

  // Get navigation state
  getState: (path) => {
    try {
      const state = sessionStorage.getItem(`nav_state_${path}`);
      return state ? JSON.parse(state) : null;
    } catch {
      return null;
    }
  }
};