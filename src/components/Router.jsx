import React, { useState, useEffect } from 'react';

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState('/');
  
  useEffect(() => {
    window.setCurrentPath = setCurrentPath;
  }, []);

  const navigate = (path) => setCurrentPath(path);

  return React.Children.map(children, child => 
    React.cloneElement(child, { currentPath, navigate })
  );
};

export const Route = ({ path, component: Component, currentPath, navigate }) => {
  return currentPath === path ? <Component navigate={navigate} /> : null;
};