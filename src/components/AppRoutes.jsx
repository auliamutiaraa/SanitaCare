import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import LandingPage from '../pages/LandingPage';
import CanteenListPage from '../pages/CanteenListPage';
import CanteenDetailPage from '../pages/CanteenDetailPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AuditorDashboard from '../pages/AuditorDashboard';
import CreateInspectionPage from '../pages/CreateInspectionPage';
import TenantDashboard from '../pages/TenantDashboard';
import EditProfilePage from '../pages/EditProfilePage';

// Components
import { ProtectedRoute } from './common/ProtectedRoute';
import { AppLayout } from './layout/AppLayout';

/**
 * Komponen AppRoutes untuk merender antarmuka pengguna.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute Publik Tanpa AppLayout (Background Khusus/Default) */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rute Publik Dengan AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/canteens" element={<CanteenListPage />} />
        <Route path="/canteens/:id" element={<CanteenDetailPage />} />
      </Route>

      {/* Rute Terproteksi Khusus Auditor */}
      <Route element={<ProtectedRoute allowedRoles={['auditor']} />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard/auditor" element={<AuditorDashboard />} />
          <Route path="/dashboard/auditor/create" element={<CreateInspectionPage />} />
        </Route>
      </Route>

      {/* Rute Terproteksi Khusus Tenant */}
      <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard/tenant" element={<TenantDashboard />} />
        </Route>
      </Route>

      {/* Rute Terproteksi Khusus Student/Umum (termasuk Auditor & Tenant) */}
      <Route element={<ProtectedRoute allowedRoles={['student', 'auditor', 'tenant']} />}>
        <Route element={<AppLayout />}>
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
