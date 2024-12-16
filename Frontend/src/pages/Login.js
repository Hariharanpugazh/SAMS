import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/accounts/login/', formData);
      setSuccess(true);
      setTimeout(() => {
        // alert("Navigating to the dashboard!");
        navigate('/studentdashboard'); // Replace with actual navigation logic
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white bg-opacity-10 backdrop-blur-lg shadow-2xl transform hover:scale-105 transition-all duration-500">
        <h2 className="text-4xl font-extrabold text-center text-white mb-6 animate-fadeInDown">Welcome Back</h2>
        
        {/* Success Message */}
        {success && (
          <p className="text-green-400 text-center mb-4 animate-pulse">
            Login Successful! Redirecting...
          </p>
        )}

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative flex items-center">
            <Lock className="absolute left-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
              required
            />
            <span
              className="absolute right-3 cursor-pointer text-gray-400 hover:text-white transition duration-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-500"
          >
            Login
          </button>
        </form>

        {/* Navigate to Register */}
        <p className="mt-6 text-center text-gray-300">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
