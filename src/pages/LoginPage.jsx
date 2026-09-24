import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import { toast } from 'sonner';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/AuthContext';
import logoSanitacare from '../assets/logo-sanitacare.png';

const loginSchema = z.object({
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z.string().min(1, { message: 'Password wajib diisi' }),
});

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // Ambil profile role untuk redirect (sementara fetch manual untuk routing cepat)
      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      toast.success('Login berhasil!');
      
      const role = profileData?.role;
      if (role === 'auditor') {
        navigate('/dashboard/auditor');
      } else if (role === 'tenant') {
        navigate('/dashboard/tenant');
      } else {
        navigate('/'); // student ke halaman utama
      }
    } catch (error) {
      toast.error('Email atau Password salah.');
    } finally {
      setIsLoading(false);
    }
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

      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 z-10 relative">
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

          <h2 className="mt-8 text-3xl font-extrabold text-[#0f2e22]">Masuk ke Akun Anda</h2>
          <p className="mt-2 text-sm text-slate-500">
            Masuk ke akun SanitaCare Anda
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-xl border border-transparent bg-[#009a60] px-4 py-3.5 text-sm font-bold text-white hover:bg-[#008855] focus:outline-none focus:ring-2 focus:ring-[#009a60] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-md shadow-[#009a60]/20"
            >
              {isLoading ? 'Masuk...' : 'Masuk'}
            </button>
          </div>
          
          <div className="text-center text-sm text-slate-500 mt-6">
            Belum punya akun?{' '}
            <Link to="/register" className="font-bold text-[#009a60] hover:text-[#008855] transition-colors">
              Daftar di sini
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
