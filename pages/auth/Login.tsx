import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import Logo from '../../components/Logo';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useData();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(identifier, password);
    if (user) {
      if (user.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-100 p-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo className="h-12"/>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Welcome Back!</h2>
          <p className="text-center text-gray-500 mb-6">Sign in to continue</p>
          
          {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded-md mb-4">{error}</p>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username or Email</label>
              <input 
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your username or email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-right text-sm">
              <Link to="/forgot-password" className="font-medium text-cyan-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition !mt-6">
              Login
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <Link to="/signup" className="font-medium text-cyan-600 hover:underline">Sign Up</Link>
        </p>
      </div>
      <footer className="absolute bottom-4 text-center text-xs text-gray-500">
        <div className="flex space-x-4">
            <Link to="/about" className="hover:underline">About Us</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
        </div>
        <p className="mt-2">&copy; {new Date().getFullYear()} Easy Earning. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
