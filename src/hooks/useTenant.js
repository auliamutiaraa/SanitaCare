import { useState, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../hooks/AuthContext';

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

  const uploadBannerPhoto = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `canteens/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sanitacare-bucket')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('sanitacare-bucket')
        .getPublicUrl(filePath);

      return { publicUrl: data.publicUrl };
    } catch (err) {
      console.error('Error uploading photo:', err);
      throw err;
    }
  };

  const registerCanteen = async (canteenData, file) => {
    if (!user) return { success: false };
    setLoading(true);
    try {
      let bannerUrl = canteenData.banner_url || null;
      if (file) {
        const { publicUrl } = await uploadBannerPhoto(file);
        bannerUrl = publicUrl;
      }

      const { error } = await supabase
        .from('canteens')
        .insert([{
          owner_id: user.id,
          name: canteenData.name,
          faculty_location: canteenData.faculty_location,
          description: canteenData.description,
          banner_url: bannerUrl
        }]);
      
      if (error) throw error;
      await fetchTenantData();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return { myCanteen, myRequests, loading, fetchTenantData, createRequest, registerCanteen };
}
