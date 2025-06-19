import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Skillcypher1 from '../images/Skillcypher1.png'

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Fetch user info if logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      fetch('/api/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null));
    } else {
      setUser(null);
    }
  }, [location.pathname]); // refetch on route change

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    }
    if (showProfile || showMobileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfile, showMobileMenu]);

  // Listen for token changes in localStorage (e.g., login/logout in another tab)
  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === 'token') {
        setIsLoggedIn(!!localStorage.getItem('token'));
      }
    }
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowProfile(false);
    setShowMobileMenu(false);
    setUser(null);
    navigate('/login');
  };

  const handleMobileLinkClick = () => {
    setShowMobileMenu(false);
  };

  return (
    <div>
      <nav className='flex px-4 md:px-10 py-3 items-center justify-between text-black font-bold rounded-b-xl relative' style={{ backgroundColor: '#54F4B9' }}>
        {/* Logo */}
        <img className='-my-18 py-3 w-32 md:w-40' src={Skillcypher1} alt="Skillcypher Logo" width="160" height="44" loading="lazy" decoding="async" />
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-8 items-center'>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/courses'>Courses</Link>
          {!isLoggedIn ? (
            <Link to='/login' className="px-4 py-2 rounded h-10 flex items-center hover:bg-purple-200 transition text-black" style={{minWidth: 100}}>Login</Link>
          ) : (
            <div className="relative h-10 flex items-center" ref={dropdownRef}>
              <button
                onClick={() => setShowProfile(v => !v)}
                className="px-4 py-2 h-10 rounded-full bg-[#54F4B9] text-black font-bold hover:bg-[#ACE1AF] transition flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ACE1AF]"
                aria-haspopup="true"
                aria-expanded={showProfile}
                style={{minWidth: 110}}
              >
                <span className="w-8 h-8 rounded-full bg-white text-[#54F4B9] flex items-center justify-center font-bold">{user?.name?.[0]?.toUpperCase() || 'U'}</span>
                <span className="ml-1">Profile</span>
                <svg className={`ml-2 w-4 h-4 transition-transform ${showProfile ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg z-50 flex flex-col p-3 gap-2 border border-[#ACE1AF] animate-fade-in">
                  <Link to="/dashboard" className="py-2 px-4 rounded-lg font-medium text-[#54F4B9] bg-[#e6fcf3] hover:bg-[#ACE1AF] transition text-center" onClick={()=>setShowProfile(false)}>Dashboard</Link>
                  <button onClick={handleLogout} className="w-full py-2 px-4 rounded-lg font-bold text-white bg-[#ff4d4f] hover:bg-[#d9363e] transition">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          {isLoggedIn && (
            <span className="w-8 h-8 rounded-full bg-white text-[#54F4B9] flex items-center justify-center font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
          )}
          <button
            onClick={() => setShowMobileMenu(v => !v)}
            className="p-2 focus:outline-none focus:ring-2 focus:ring-[#ACE1AF] rounded"
            aria-label="Toggle mobile menu"
            aria-haspopup="true"
            aria-expanded={showMobileMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div 
            ref={mobileMenuRef}
            className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl z-50 md:hidden border-t border-[#ACE1AF]"
          >
            <div className="flex flex-col p-4 gap-3">
              <Link to='/' className="py-2 px-4 rounded-lg text-[#54F4B9] hover:bg-[#e6fcf3] transition" onClick={handleMobileLinkClick}>Home</Link>
              <Link to='/about' className="py-2 px-4 rounded-lg text-[#54F4B9] hover:bg-[#e6fcf3] transition" onClick={handleMobileLinkClick}>About</Link>
              <Link to='/contact' className="py-2 px-4 rounded-lg text-[#54F4B9] hover:bg-[#e6fcf3] transition" onClick={handleMobileLinkClick}>Contact</Link>
              <Link to='/courses' className="py-2 px-4 rounded-lg text-[#54F4B9] hover:bg-[#e6fcf3] transition" onClick={handleMobileLinkClick}>Courses</Link>
              <div className="border-t border-[#ACE1AF] my-2"></div>
              {!isLoggedIn ? (
                <Link to='/login' className="py-2 px-4 rounded-lg bg-[#54F4B9] text-black font-bold hover:bg-[#ACE1AF] transition text-center" onClick={handleMobileLinkClick}>Login</Link>
              ) : (
                <>
                  <Link to="/dashboard" className="py-2 px-4 rounded-lg font-medium text-[#54F4B9] bg-[#e6fcf3] hover:bg-[#ACE1AF] transition text-center" onClick={handleMobileLinkClick}>Dashboard</Link>
                  <button onClick={handleLogout} className="w-full py-2 px-4 rounded-lg font-bold text-white bg-[#ff4d4f] hover:bg-[#d9363e] transition">Logout</button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Nav