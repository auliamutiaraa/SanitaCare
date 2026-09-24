import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../hooks/AuthContext';
import { useProfile } from '../hooks/useProfile';
import { User, Camera, Loader2, Save } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(3, { message: 'Nama lengkap minimal 3 karakter' }),
  email: z.string().email({ message: 'Format email tidak valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }).optional().or(z.literal('')),
});

export default function EditProfilePage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { updateProfile, uploadAvatar, isLoading, uploadingAvatar, avatarUrl } = useProfile(user, profile);

  const handleAvatarUpload = async (event) => {
    await uploadAvatar(event);
  };

  const onSubmit = async (data) => {
    await updateProfile(data);
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.full_name || '',
      email: user?.email || '',
      password: '',
    },
  });

  useEffect(() => {
    if (profile && user) {
      reset({
        fullName: profile.full_name || '',
        email: user.email || '',
        password: '',
      });
    }
  }, [profile, user, reset]);

      if (!user || !profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Edit Profil</h1>
          <p className="mt-2 text-sm text-slate-600">
            Perbarui informasi akun Anda di bawah ini.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          {/* Avatar Section */}
          <div className="flex flex-col items-center justify-center mb-8 pb-8 border-b border-slate-100">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold overflow-hidden border-4 border-white shadow-lg">
                {uploadingAvatar ? (
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                ) : avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12" />
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingAvatar}
                className="absolute bottom-0 right-0 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors shadow-md disabled:opacity-50"
                title="Ubah Foto Profil"
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
              />
            </div>
            <p className="mt-3 text-sm text-slate-500 font-medium">{profile?.role?.toUpperCase()}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
              <input
                {...register('fullName')}
                type="text"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              />
              {errors.fullName && <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700">Email Baru</label>
              <input
                {...register('email')}
                type="email"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
              <p className="mt-1.5 text-xs text-slate-500">Catatan: Mengubah email mungkin memerlukan konfirmasi ke email yang baru.</p>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium text-slate-900 border-b border-slate-200 pb-2 mb-4">Ubah Password</h3>
              <label className="block text-sm font-medium text-slate-700">Password Baru</label>
              <input
                {...register('password')}
                type="password"
                placeholder="Biarkan kosong jika tidak ingin diubah"
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 sm:text-sm"
              />
              {errors.password && <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>}
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
