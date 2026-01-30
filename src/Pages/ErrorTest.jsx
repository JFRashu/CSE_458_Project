import React from 'react';

const ErrorTest = ({ navigate }) => {
  const [shouldError, setShouldError] = React.useState(false);

  if (shouldError) {
    throw new Error('Test error for error boundary');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Boundary Test</h1>
        <p className="text-gray-600 mb-6">Click the button below to trigger an error and test the error boundary.</p>
        <button
          onClick={() => setShouldError(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Trigger Error
        </button>
        <br />
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorTest;