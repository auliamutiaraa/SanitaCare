import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

export function useTenant() {
  const { user } = useAuth();
  const [myCanteen, setMyCanteen] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTenantData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      // Get canteen owned by tenant
      const { data: canteen, error: canteenError } = await supabase
        .from('canteens')
        .select('*')
        .eq('owner_id', user.id)
        .maybeSingle(); // maybeSingle so it doesn't throw if not found
      
      if (canteenError) throw canteenError;
      setMyCanteen(canteen || null);

      if (canteen) {
        // Get inspection requests for this canteen
        const { data: requests, error: reqError } = await supabase
          .from('inspection_requests')
          .select('*')
          .eq('canteen_id', canteen.id)
          .order('requested_at', { ascending: false });
        
        if (reqError) throw reqError;
        setMyRequests(requests || []);
      }
    } catch (error) {
      console.error('Error fetching tenant data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createRequest = async (notes) => {
    if (!myCanteen || !user) return { success: false, error: 'Kantin belum terdaftar' };
    try {
      const { error } = await supabase
        .from('inspection_requests')
        .insert([{
          canteen_id: myCanteen.id,
          tenant_id: user.id,
          notes: notes
        }]);
      
      if (error) throw error;
      await fetchTenantData(); // Refresh data
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const registerCanteen = async (canteenData) => {
    if (!user) return { success: false };
    try {
      const { error } = await supabase
        .from('canteens')
        .insert([{
          owner_id: user.id,
          name: canteenData.name,
          faculty_location: canteenData.faculty_location,
          description: canteenData.description
        }]);
      
      if (error) throw error;
      await fetchTenantData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { myCanteen, myRequests, loading, fetchTenantData, createRequest, registerCanteen };
}
