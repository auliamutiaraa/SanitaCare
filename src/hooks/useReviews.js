import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../hooks/AuthContext';

export function useReviews() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const submitReview = async (canteenId, rating, comment, photoFile) => {
    if (!user || profile?.role !== 'student') {
      return { success: false, error: 'Hanya mahasiswa terdaftar yang dapat memberikan ulasan.' };
    }
    
    setLoading(true);
    try {
      let photoUrl = null;

      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `reviews/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('sanitacare-bucket')
          .upload(filePath, photoFile);

        if (uploadError) {
          throw new Error('Gagal mengunggah foto: ' + uploadError.message);
        }

        const { data: { publicUrl } } = supabase.storage
          .from('sanitacare-bucket')
          .getPublicUrl(filePath);

        photoUrl = publicUrl;
      }

      const { error } = await supabase
        .from('reviews')
        .insert([{
          canteen_id: canteenId,
          student_id: user.id,
          rating: rating,
          comment: comment,
          photo_url: photoUrl
        }]);
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error submitting review:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { submitReview, loading };
}
