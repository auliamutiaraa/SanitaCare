import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, User, Settings, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const handleSignInNewAccount = async () => {
    await logout();
    navigate('/login');
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  const getDashboardLink = () => {
    if (!profile) return '/';
    if (profile.role === 'auditor') return '/dashboard/auditor';
    if (profile.role === 'tenant') return '/dashboard/tenant';
    return '/'; // Student can be directed to home or profile page if exists
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-emerald-800">SanitaCare</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              Beranda
            </NavLink>
            <NavLink 
              to="/canteens" 
              className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              Katalog Kantin
            </NavLink>
            
            {user ? (
              <div className="flex items-center gap-4">
                {(profile?.role === 'auditor' || profile?.role === 'tenant') && (
                  <NavLink 
                    to={getDashboardLink()} 
                    className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-emerald-600 font-semibold' : 'text-slate-600 hover:text-emerald-600'}`}
                  >
                    Dashboard
                  </NavLink>
                )}
                
                {/* Profile Dropdown */}
                <div className="relative border-l pl-4 border-slate-200" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border-2 border-transparent hover:border-emerald-300 transition-all overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile?.full_name?.charAt(0) || <User className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden py-1 z-50">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900 truncate">{profile?.full_name || 'Pengguna'}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      
                      <Link 
                        to="/profile/edit" 
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>Edit Profile</span>
                      </Link>
                      
                      <button 
                        onClick={handleSignInNewAccount}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors text-left"
                      >
                        <UserPlus className="w-4 h-4 text-slate-400" />
                        <span>Sign in new account</span>
                      </button>
                      
                      <div className="border-t border-slate-100 my-1"></div>
                      
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">Masuk</Link>
                <Link to="/register" className="text-sm font-medium bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200">
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-emerald-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
          <NavLink 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'}`}
          >
            Beranda
          </NavLink>
          <NavLink 
            to="/canteens" 
            onClick={() => setIsOpen(false)} 
            className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'}`}
          >
            Katalog Kantin
          </NavLink>
          
          {user ? (
            <>
              {(profile?.role === 'auditor' || profile?.role === 'tenant') && (
                <NavLink 
                  to={getDashboardLink()} 
                  onClick={() => setIsOpen(false)} 
                  className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-emerald-600 bg-emerald-50' : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50'}`}
                >
                  Dashboard
                </NavLink>
              )}
              
              <div className="pt-4 pb-2 border-t border-slate-100 mt-2">
                <div className="flex items-center px-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold overflow-hidden">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      profile?.full_name?.charAt(0) || <User className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-base font-medium text-slate-800">{profile?.full_name || 'Pengguna'}</p>
                    <p className="text-sm font-medium text-slate-500">{user.email}</p>
                  </div>
                </div>
                
                <Link 
                  to="/profile/edit" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  <Settings className="w-5 h-5 text-slate-400" />
                  Edit Profile
                </Link>
                
                <button 
                  onClick={handleSignInNewAccount} 
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                >
                  <UserPlus className="w-5 h-5 text-slate-400" />
                  Sign in new account
                </button>
                
                <button 
                  onClick={handleLogout} 
                  className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-md text-base font-medium text-rose-600 hover:bg-rose-50 mt-1"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-emerald-600 border border-emerald-200 text-center">Masuk</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-emerald-600 text-center">Daftar</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
