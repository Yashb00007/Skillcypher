import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Skillcypher1 from '../components/../images/Skillcypher1.png';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const ADMIN_EMAIL = "teamskillcypher@gmail.com"; // Change to your real admin email

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { email: form.email, password: form.password };
      const res = await axios.post('/api/auth/login', payload);
      setMsg('Login successful!');
      localStorage.setItem('token', res.data.token);
      // Check if admin
      if (form.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        localStorage.setItem('adminEmail', form.email); // Save admin email for route guard
        localStorage.setItem('userRole', 'admin');
        setTimeout(() => navigate('/admin'), 1000);
      } else if (res.data.user.role === 'subadmin') {
        localStorage.setItem('userRole', 'subadmin');
        setTimeout(() => navigate('/subadmin'), 1000);
      } else {
        localStorage.removeItem('adminEmail');
        localStorage.setItem('userRole', 'student');
        setTimeout(() => navigate('/dashboard'), 1000);
      }
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e6fcf3] via-[#54F4B9] to-[#ACE1AF] relative overflow-hidden">
      {/* Decorative SVG wave at the bottom */}
      <svg className="absolute bottom-0 left-0 w-full" height="120" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#54F4B9" fillOpacity="0.2" d="M0,64L48,74.7C96,85,192,107,288,117.3C384,128,480,128,576,117.3C672,107,768,85,864,80C960,75,1056,85,1152,101.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      <div className="relative z-10 max-w-md w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-[#ACE1AF]">
        <div className="flex flex-col items-center mb-6">
          <img src={Skillcypher1} alt="Logo" className="w-20 h-20 rounded-full shadow-lg border-4 border-[#54F4B9] bg-white -mt-16 mb-2" />
          <h2 className="text-4xl font-extrabold text-[#54F4B9] mb-2 tracking-tight drop-shadow">Login</h2>
          <p className="text-gray-600 text-center mb-2">Welcome back! Please login to your account.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#54F4B9] text-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#54F4B9] text-lg shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#54F4B9] hover:bg-[#ACE1AF] text-white font-bold py-3 rounded-xl shadow-lg transition duration-200 text-lg tracking-wide"
          >
            Login
          </button>
          {msg && <div className="mt-2 text-center text-red-500">{msg}</div>}
        </form>
        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#54F4B9] font-semibold hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
