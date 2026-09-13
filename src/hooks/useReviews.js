import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export function useReviews() {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const submitReview = async (canteenId, rating, comment) => {
    if (!user || profile?.role !== 'student') {
      return { success: false, error: 'Hanya mahasiswa terdaftar yang dapat memberikan ulasan.' };
    }
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([{
          canteen_id: canteenId,
          student_id: user.id,
          rating: rating,
          comment: comment
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
