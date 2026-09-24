import { useState, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from '../hooks/AuthContext';

/**
 * Custom hook useInspections untuk mengelola logika dan state terkait.
 * @returns {Object} State dan fungsi helper yang dapat digunakan komponen.
 */
export function useInspections() {
  const { user } = useAuth();
  const [inspections, setInspections] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil riwayat audit untuk auditor ini
  const fetchMyInspections = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('inspections')
        .select(`
          *,
          canteens(name, faculty_location)
        `)
        .eq('auditor_id', user.id)
        .order('inspected_at', { ascending: false });

      if (fetchError) throw fetchError;
      setInspections(data);
    } catch (err) {
      console.error('Error fetching inspections:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Ambil request dari tenant
  const fetchInspectionRequests = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('inspection_requests')
        .select(`
          *,
          canteens(name, faculty_location),
          profiles!inspection_requests_tenant_id_fkey(full_name)
        `)
        .order('requested_at', { ascending: false });

      if (fetchError) throw fetchError;
      setRequests(data);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update status request (Approve/Reject)
  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      const { error } = await supabase
        .from('inspection_requests')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (error) throw error;
      await fetchInspectionRequests(); // Refresh
      return { success: true };
    } catch (err) {
      console.error('Error updating request status:', err);
      return { success: false, error: err.message };
    }
  };

  // Upload Foto ke Supabase Storage (sanitacare-bucket)
  const uploadProofPhoto = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `audits/${fileName}`;

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

  // Submit Audit Baru
  const createInspection = async (inspectionData, file) => {
    setLoading(true);
    try {
      let photoUrl = null;
      if (file) {
        const { publicUrl } = await uploadProofPhoto(file);
        photoUrl = publicUrl;
      }

      // 1. Insert Inspection
      const { data: newInspection, error: insertError } = await supabase
        .from('inspections')
        .insert([{
          canteen_id: inspectionData.canteen_id,
          auditor_id: user.id,
          score_water: inspectionData.score_water,
          score_waste: inspectionData.score_waste,
          score_food_handling: inspectionData.score_food_handling,
          total_score: inspectionData.total_score,
          grade: inspectionData.grade,
          notes: inspectionData.notes,
          proof_photo_url: photoUrl
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Insert Inspection Error:', insertError);
        return { success: false, error: 'Gagal insert inspeksi: ' + insertError.message };
      }

      // 2. Update Canteen Grade
      const { error: updateError } = await supabase
        .from('canteens')
        .update({ current_grade: inspectionData.grade })
        .eq('id', inspectionData.canteen_id);

      if (updateError) {
        console.error('Update Canteen Error:', updateError);
        return { success: false, error: 'Gagal update grade kantin: ' + updateError.message };
      }

      // Optional: If this was tied to a request, mark it completed. 
      if (inspectionData.request_id) {
        const updateReqRes = await updateRequestStatus(inspectionData.request_id, 'completed');
        if (!updateReqRes.success) {
           console.error('Update Request Error:', updateReqRes.error);
           return { success: false, error: 'Gagal update status request: ' + updateReqRes.error };
        }
      }

      return { success: true, data: newInspection };
    } catch (err) {
      console.error('Error creating inspection:', err);
      return { success: false, error: 'System error: ' + err.message };
    } finally {
      setLoading(false);
    }
  };

  // Fetch only canteens list for the dropdown
  const fetchAllCanteensSelect = async () => {
    try {
      const { data, error } = await supabase
        .from('canteens')
        .select('id, name, faculty_location')
        .order('name');
      if (error) throw error;
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return {
    inspections,
    requests,
    loading,
    error,
    fetchMyInspections,
    fetchInspectionRequests,
    updateRequestStatus,
    createInspection,
    fetchAllCanteensSelect
  };
}
