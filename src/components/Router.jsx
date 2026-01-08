import React, { useState, useEffect, useCallback } from 'react';
import { NavigationProvider, navigationUtils } from '../utils/navigation';

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  // Update current path when browser navigation occurs
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial path
    if (window.location.pathname !== currentPath) {
      setCurrentPath(window.location.pathname);
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPath]);

  // Enhanced navigate function
  const navigate = useCallback((path, options = {}) => {
    if (!path) return;

    // Handle different navigation types
    if (options.replace) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }

    setCurrentPath(path);

    // Handle state if provided
    if (options.state) {
      navigationUtils.goToWithState(navigate, path, options.state);
    }

    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, []);

  // Make navigate function globally available for backward compatibility
  useEffect(() => {
    window.setCurrentPath = setCurrentPath;
    window.navigate = navigate;
  }, [navigate]);

  return (
    <NavigationProvider navigate={navigate}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { currentPath, navigate })
      )}
    </NavigationProvider>
  );
};

export const Route = ({ path, component: Component, currentPath, navigate }) => {
  // Support dynamic routes with parameters
  const isMatch = (routePath, currentPath) => {
    if (routePath === currentPath) return true;

    // Simple parameter matching (e.g., /user/:id)
    const routeParts = routePath.split('/');
    const currentParts = currentPath.split('/');

    if (routeParts.length !== currentParts.length) return false;

    return routeParts.every((part, index) => {
      if (part.startsWith(':')) return true; // Parameter
      return part === currentParts[index];
    });
  };

  const match = isMatch(path, currentPath);

  if (!match) return null;

  // Extract route parameters
  const getParams = (routePath, currentPath) => {
    const params = {};
    const routeParts = routePath.split('/');
    const currentParts = currentPath.split('/');

    routeParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        const paramName = part.slice(1);
        params[paramName] = currentParts[index];
      }
    });

    return params;
  };

  const params = getParams(path, currentPath);

  return <Component navigate={navigate} routeParams={params} />;
};