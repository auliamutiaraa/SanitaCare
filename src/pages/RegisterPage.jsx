import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuthActions } from '../hooks/useAuthActions';

import logoSanitacare from '../assets/logo-sanitacare.png';

const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
  role: z.enum(['student', 'auditor', 'tenant'], { required_error: 'Role harus dipilih' }),
});

/**
 * Komponen RegisterPage untuk merender antarmuka pengguna.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export default function RegisterPage() {
  const { register: registerAuth, isLoading } = useAuthActions();
  const [showPassword, setShowPassword] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    await registerAuth(data);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#faf9f4] px-4 py-12 sm:px-6 lg:px-8 overflow-hidden z-0">
      {/* Background Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <svg className="absolute bottom-0 left-0 w-[85vw] md:w-[55vw] text-[#d8e5d3]" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 600H1000C1000 600 800 450 500 350C200 250 50 100 0 0V600Z" fill="currentColor"/>
        </svg>
        <svg className="absolute top-[10%] right-0 w-[70vw] md:w-[45vw] text-[#e2ede0]" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M800 0V1000C800 1000 600 800 400 600C200 400 50 250 0 100C0 100 200 50 800 0Z" fill="currentColor"/>
        </svg>
      </div>

      <main className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 z-10 relative">
        <div className="text-center">
          <div className="mx-auto flex flex-col items-center justify-center">
            <img src={logoSanitacare} alt="Logo" className="h-14 w-14 object-contain" />
            <div className="text-center mt-2">
              <span className="block font-extrabold text-[22px] tracking-tight text-[#0f2e22] leading-tight">
                SanitaCare
              </span>
              <span className="block text-[9px] font-bold text-[#0f2e22]/70 tracking-[0.2em] uppercase mt-0.5">
                Sriwijaya University
              </span>
            </div>
          </div>
          <h2 className="mt-8 text-3xl font-extrabold text-[#0f2e22]">Daftar Akun Baru</h2>
          <p className="mt-2 text-sm text-slate-500">
            Gabung dengan komunitas SanitaCare
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-bold text-[#0f2e22] mb-1.5">Nama Lengkap</label>
            <input
              {...register('fullName')}
              type="text"
              className="block w-full rounded-lg border border-[#e2e8f0] bg-[#fcfdfa] px-4 py-3 text-sm placeholder-slate-400 focus:border-[#009a60] focus:outline-none focus:ring-1 focus:ring-[#009a60] transition-colors"
              placeholder="John Doe"
            />
            {errors.fullName && <p className="mt-1.5 text-xs text-rose-500">{errors.fullName.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#0f2e22] mb-1.5">Email</label>
            <input
              {...register('email')}
              type="email"
              className="block w-full rounded-lg border border-[#e2e8f0] bg-[#fcfdfa] px-4 py-3 text-sm placeholder-slate-400 focus:border-[#009a60] focus:outline-none focus:ring-1 focus:ring-[#009a60] transition-colors"
              placeholder="mahasiswa@unsri.ac.id"
            />
            {errors.email && <p className="mt-1.5 text-xs text-rose-500">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0f2e22] mb-1.5">Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? "text" : "password"}
                className="block w-full rounded-lg border border-[#e2e8f0] bg-[#fcfdfa] px-4 py-3 pr-11 text-sm placeholder-slate-400 focus:border-[#009a60] focus:outline-none focus:ring-1 focus:ring-[#009a60] transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1.5 text-xs text-rose-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#0f2e22] mb-1.5">Role Anda</label>
            <div className="relative">
              <select
                {...register('role')}
                className="block w-full appearance-none rounded-lg border border-[#e2e8f0] bg-[#fcfdfa] px-4 py-3 pr-10 text-sm focus:border-[#009a60] focus:outline-none focus:ring-1 focus:ring-[#009a60] transition-colors"
              >
                <option value="">Pilih Role...</option>
                <option value="student">Mahasiswa</option>
                <option value="tenant">Pemilik Kantin (Tenant)</option>
                <option value="auditor">Auditor Kesmas</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {errors.role && <p className="mt-1.5 text-xs text-rose-500">{errors.role.message}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-xl border border-transparent bg-[#009a60] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#008855] focus:outline-none focus:ring-2 focus:ring-[#009a60] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md shadow-[#009a60]/20"
            >
              {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </button>
          </div>
          
          <div className="text-center text-sm text-slate-500 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-bold text-[#009a60] hover:text-[#008855] transition-colors">
              Login di sini
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
