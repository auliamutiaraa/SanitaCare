import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuthActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (data) => {
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

  const register = async (data) => {
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

  return { login, register, isLoading };
};
