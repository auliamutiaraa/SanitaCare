import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    if (!profile) return '/';
    if (profile.role === 'auditor') return '/dashboard/auditor';
    if (profile.role === 'tenant') return '/dashboard/tenant';
    return '/'; // Student can be directed to home or profile page if exists
  };

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
                <div className="flex items-center gap-2 border-l pl-4 border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    {profile?.full_name?.charAt(0) || <User className="w-4 h-4" />}
                  </div>
                  <button onClick={handleLogout} className="text-sm font-medium text-rose-600 hover:text-rose-700">Logout</button>
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
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-rose-600 hover:bg-rose-50">Logout</button>
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
