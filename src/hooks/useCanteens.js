import { useState, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

/**
 * Custom hook useCanteens untuk mengelola logika dan state terkait.
 * @returns {Object} State dan fungsi helper yang dapat digunakan komponen.
 */
export function useCanteens() {
  const [canteens, setCanteens] = useState([]);
  const [canteenDetail, setCanteenDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCanteens = useCallback(async ({ search = '', grades = [], faculty = '', limit = null }) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('canteens').select(`
        *,
        reviews(rating)
      `);

      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      if (grades.length > 0) {
        query = query.in('current_grade', grades);
      }
      if (faculty) {
        query = query.eq('faculty_location', faculty);
      }
      if (limit) {
        query = query.limit(limit);
      }

      // Order by created_at or name (default to name for consistency)
      query = query.order('name', { ascending: true });

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;

      // Kalkulasi rata-rata rating
      const formattedData = data.map(canteen => {
        const ratings = canteen.reviews?.map(r => r.rating) || [];
        const avgRating = ratings.length > 0 
          ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) 
          : null;
        
        return {
          ...canteen,
          avgRating,
          reviewsCount: ratings.length
        };
      });

      setCanteens(formattedData);
    } catch (err) {
      console.error('Error fetching canteens:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCanteenDetail = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data: canteen, error: fetchError } = await supabase
        .from('canteens')
        .select(`
          *,
          profiles (full_name),
          inspections (
            id, score_water, score_waste, score_food_handling, total_score, grade, proof_photo_url, notes, inspected_at
          ),
          reviews (
            id, rating, comment, photo_url, created_at, profiles (full_name, avatar_url)
          )
        `)
        .eq('id', id)
        .single();
        
      if (fetchError) throw fetchError;
      
      setCanteenDetail(canteen);
    } catch (err) {
      console.error('Error fetching canteen detail:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { canteens, canteenDetail, loading, error, fetchCanteens, getCanteenDetail };
}
