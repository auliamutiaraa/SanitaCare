import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          {/* Skeleton Spinner */}
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Jika belum login, arahkan ke login
  if (!user || !profile) {
    return <Navigate to="/login" replace />;
  }

  // Jika role tidak sesuai, arahkan ke halaman utama
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
