import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Leaf, Menu, X, User, Settings, LogOut, UserPlus, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoSanitacare from '../../assets/logo-sanitacare.png';

const NavbarPattern = () => (
  <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-5">
      <defs>
        <pattern id="nav-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="20" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#nav-pattern)" className="text-emerald-900" />
    </svg>
  </div>
);

const RoleBadge = ({ role }) => {
  if (!role) return null;
  const styles = {
    auditor: "bg-blue-50 text-blue-700 border-blue-200",
    tenant: "bg-amber-50 text-amber-700 border-amber-200",
    student: "bg-emerald-50 text-emerald-700 border-emerald-200"
  };
  const currentStyle = styles[role.toLowerCase()] || styles.student;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${currentStyle}`}>
      {role}
    </span>
  );
};

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
    return '/';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      isActive
        ? 'text-emerald-700 bg-emerald-50 shadow-sm ring-1 ring-emerald-100/50'
        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
      isActive
        ? 'text-emerald-700 bg-emerald-50 shadow-sm border border-emerald-100/50'
        : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
    }`;

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-emerald-100/50 relative">
        <NavbarPattern />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 group focus:outline-none">
              <img src={logoSanitacare} alt="Logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain group-hover:scale-105 transition-transform duration-300" />
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-teal-700 leading-tight">
                  SanitaCare
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-emerald-600/80 tracking-wider uppercase leading-none">
                  Sriwijaya University
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/" className={navLinkClass}>
                Beranda
              </NavLink>
              <NavLink to="/canteens" className={navLinkClass}>
                Katalog Kantin
              </NavLink>
              
              {user ? (
                <div className="flex items-center gap-2 ml-4">
                  {(profile?.role === 'auditor' || profile?.role === 'tenant') && (
                    <NavLink to={getDashboardLink()} className={navLinkClass}>
                      Dashboard
                    </NavLink>
                  )}
                  
                  {/* Profile Dropdown */}
                  <div className="relative ml-2 pl-4 border-l border-emerald-100/60" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-3 p-1.5 pr-3 rounded-full hover:bg-emerald-50/80 transition-all focus:outline-none group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-100 to-teal-50 p-[2px] shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
                        <div className="w-full h-full rounded-[10px] bg-white overflow-hidden flex items-center justify-center text-emerald-700 font-bold">
                          {profile?.avatar_url ? (
                            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            profile?.full_name?.charAt(0) || <User className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start hidden lg:flex">
                        <span className="text-sm font-bold text-slate-700 max-w-[120px] truncate">{profile?.full_name || 'Pengguna'}</span>
                        <RoleBadge role={profile?.role} />
                      </div>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100/50 overflow-hidden py-2 z-50 transform origin-top-right transition-all animate-in fade-in slide-in-from-top-2">
                        <div className="px-5 py-4 border-b border-slate-100/80 bg-slate-50/50">
                          <p className="text-sm font-bold text-slate-900 truncate">{profile?.full_name || 'Pengguna'}</p>
                          <p className="text-xs font-medium text-slate-500 truncate mt-0.5">{user.email}</p>
                        </div>
                        
                        <div className="p-2 space-y-1">
                          <Link 
                            to="/profile/edit" 
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span>Pengaturan Profil</span>
                          </Link>
                          
                          <button 
                            onClick={handleSignInNewAccount}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors text-left"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>Masuk dengan akun lain</span>
                          </button>
                        </div>
                        
                        <div className="px-2 pt-1 border-t border-slate-100/80">
                          <button 
                            onClick={handleLogout} 
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Keluar</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-4">
                  <Link to="/login" className="px-5 py-2.5 rounded-full text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-all hover:scale-105">
                    Masuk
                  </Link>
                  <Link to="/register" className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500 shadow-md shadow-emerald-200/50 hover:shadow-lg hover:shadow-emerald-300 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300">
                    Daftar
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button 
                onClick={() => setIsOpen(true)} 
                className="p-2 rounded-xl text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 focus:outline-none transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 w-[280px] bg-white/95 backdrop-blur-xl shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <NavbarPattern />
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-emerald-100/50 bg-white/50">
          <span className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-teal-700">Navigasi</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 bg-slate-100/80 text-slate-500 rounded-full hover:bg-rose-100 hover:text-rose-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">
          <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>
            Beranda
          </NavLink>
          <NavLink to="/canteens" onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>
            Katalog Kantin
          </NavLink>
          
          {user ? (
            <>
              {(profile?.role === 'auditor' || profile?.role === 'tenant') && (
                <NavLink to={getDashboardLink()} onClick={() => setIsOpen(false)} className={mobileNavLinkClass}>
                  Dashboard
                </NavLink>
              )}
              
              <div className="mt-6 p-4 rounded-2xl border border-emerald-100/80 bg-emerald-50/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-100 to-teal-50 p-[2px] shadow-sm">
                    <div className="w-full h-full rounded-[10px] bg-white overflow-hidden flex items-center justify-center text-emerald-700 font-bold text-lg">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile?.full_name?.charAt(0) || <User className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{profile?.full_name || 'Pengguna'}</p>
                    <RoleBadge role={profile?.role} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Link 
                    to="/profile/edit" 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-emerald-100/50 hover:text-emerald-700 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    Pengaturan Profil
                  </Link>
                  
                  <button 
                    onClick={handleSignInNewAccount} 
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-emerald-100/50 hover:text-emerald-700 transition-colors text-left"
                  >
                    <UserPlus className="w-4 h-4 text-slate-500" />
                    Masuk akun lain
                  </button>
                  
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-3 px-3 py-2.5 mt-2 rounded-xl text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-6 flex flex-col gap-3">
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)} 
                className="w-full px-5 py-3 rounded-xl text-base font-bold text-emerald-700 border border-emerald-200 text-center hover:bg-emerald-50 transition-colors"
              >
                Masuk
              </Link>
              <Link 
                to="/register" 
                onClick={() => setIsOpen(false)} 
                className="w-full px-5 py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg shadow-emerald-200/50 text-center hover:shadow-emerald-300 transition-shadow"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
