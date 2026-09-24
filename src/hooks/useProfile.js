import { useState, useEffect } from 'react';
import { supabase } from '../services/supabaseClient';
import { toast } from 'sonner';

/**
 * Custom hook useProfile untuk mengelola logika dan state terkait.
 * @returns {Object} State dan fungsi helper yang dapat digunakan komponen.
 */
export const useProfile = (user, profile) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || '');

  useEffect(() => {
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile?.avatar_url]);

  const updateProfile = async (data) => {
    setIsLoading(true);
    try {
      let authUpdates = {};
      let profileUpdates = {};
      let needsAuthUpdate = false;
      let needsProfileUpdate = false;

      // Check if email changed
      if (data.email !== user.email) {
        authUpdates.email = data.email;
        needsAuthUpdate = true;
      }

      // Check if password changed (not empty)
      if (data.password && data.password.length > 0) {
        authUpdates.password = data.password;
        needsAuthUpdate = true;
      }

      // Check if name changed
      if (data.fullName !== profile.full_name) {
        profileUpdates.full_name = data.fullName;
        needsProfileUpdate = true;
      }

      // Update Auth (Email / Password)
      if (needsAuthUpdate) {
        const { error: authError } = await supabase.auth.updateUser(authUpdates);
        if (authError) throw authError;
        
        if (authUpdates.email) {
          toast.success('Email konfirmasi telah dikirim ke alamat baru Anda.');
        }
      }

      // Update Profile (Name)
      if (needsProfileUpdate) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileUpdates)
          .eq('id', user.id);
          
        if (profileError) throw profileError;
      }

      if (needsAuthUpdate || needsProfileUpdate) {
        toast.success('Profil berhasil diperbarui!');
        // Refresh page or user will be automatically updated by AuthContext listener
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast('Tidak ada perubahan yang disimpan.', { icon: 'ℹ️' });
      }

    } catch (error) {
      toast.error(error.message || 'Terjadi kesalahan saat memperbarui profil.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (event) => {
    try {
      setUploadingAvatar(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Anda harus memilih gambar untuk diunggah.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload image to Storage
      const { error: uploadError } = await supabase.storage
        .from('sanitacare-bucket')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('sanitacare-bucket')
        .getPublicUrl(filePath);
        
      setAvatarUrl(publicUrl);
      
      // Update profile immediately with new avatar
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);
        
      if (updateError) throw updateError;
      
      toast.success('Foto profil berhasil diperbarui!');
    } catch (error) {
      toast.error('Gagal mengunggah gambar: ' + (error.message || 'Terjadi kesalahan.'));
      console.error(error);
    } finally {
      setUploadingAvatar(false);
    }
  };

  return { updateProfile, uploadAvatar, isLoading, uploadingAvatar, avatarUrl };
};
