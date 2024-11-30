import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Please fill out both fields.');
      return;
    }

    try {
      const data = await authService.loginUser(username, password);
      console.log('Login successful, token:', data.access_token);

      // Save a token into localStorage
      localStorage.setItem('authToken', data.access_token);

      setSuccess('Login successful! Redirecting...');
      login();
      setTimeout(() => navigate('/articles'), 1500);
    } catch (error: any) {
      const message = error instanceof Error ? error.message : 'Unexpected error occurred.';
      setError(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}
        {success && (
          <div className="text-green-500 text-sm mb-4 text-center">{success}</div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
