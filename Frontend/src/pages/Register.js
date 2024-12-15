import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register', { username, email, password });
            alert('Registration successful! You can now log in.');
            window.location.href = '/login';
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter your username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-4 py-2 mt-1 text-gray-800 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600">
                    Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
