import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';
import { Leaf, Eye, EyeOff } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
  role: z.enum(['student', 'auditor', 'tenant'], { required_error: 'Role harus dipilih' }),
});

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Masukkan data ke tabel profiles secara manual
      if (authData?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: data.fullName,
              role: data.role
            }
          ]);
        
        if (profileError) {
          console.error("Gagal menyimpan profil:", profileError);
        }
      }

      toast.success('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Terjadi kesalahan saat registrasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-emerald-50">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Leaf className="h-6 w-6 text-emerald-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Daftar Akun Baru</h2>
          <p className="mt-2 text-sm text-slate-600">
            Gabung dengan komunitas SanitaCare
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
              <input
                {...register('fullName')}
                type="text"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                {...register('email')}
                type="email"
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                placeholder="mahasiswa@unsri.ac.id"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative mt-1">
                <input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 pr-10 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Role Anda</label>
              <select
                {...register('role')}
                className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              >
                <option value="">Pilih Role...</option>
                <option value="student">Mahasiswa</option>
                <option value="tenant">Pemilik Kantin (Tenant)</option>
                <option value="auditor">Auditor Kesmas</option>
              </select>
              {errors.role && <p className="mt-1 text-xs text-rose-500">{errors.role.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </button>
          </div>
          
          <div className="text-center text-sm text-slate-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
              Login di sini
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
