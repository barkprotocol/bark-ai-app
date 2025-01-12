'use client';

import { useState } from 'react';
import { PrivyLogin } from '@privy-io/react-auth';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (method: string) => {
    setIsLoading(true);
    try {
      // Initiate the login process depending on the method chosen
      await PrivyLogin({ method }); // Use PrivyLogin directly if it's available
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center">
      <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('wallet')}
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login with Wallet'}
          </button>

          <button
            onClick={() => handleLogin('email')}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login with Email'}
          </button>

          <button
            onClick={() => handleLogin('google')}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login with Google'}
          </button>

          {/* Add other login methods like GitHub, Discord, etc. */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
