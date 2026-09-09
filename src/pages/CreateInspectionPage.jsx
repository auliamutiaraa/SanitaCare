import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useInspections } from '../hooks/useInspections';
import { AuditScoreCalculator } from '../components/inspection/AuditScoreCalculator';
import { FileUploader } from '../components/common/FileUploader';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CreateInspectionPage() {
  const [searchParams] = useSearchParams();
  const reqIdParam = searchParams.get('request_id');
  const canteenIdParam = searchParams.get('canteen_id');

  const { fetchAllCanteensSelect, createInspection } = useInspections();
  const navigate = useNavigate();

  const [canteens, setCanteens] = useState([]);
  const [loadingCanteens, setLoadingCanteens] = useState(true);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCanteen, setSelectedCanteen] = useState(canteenIdParam || '');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [scores, setScores] = useState({
    score_water: 0,
    score_waste: 0,
    score_food_handling: 0,
    total_score: 0,
    grade: 'C',
  });

  useEffect(() => {
    const getCanteens = async () => {
      const data = await fetchAllCanteensSelect();
      setCanteens(data);
      setLoadingCanteens(false);
    };
    getCanteens();
  }, [fetchAllCanteensSelect]);

  const handleScoreChange = useCallback((newScores) => {
    setScores(newScores);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCanteen) {
      toast.error('Silakan pilih kantin yang diaudit.');
      return;
    }
    if (!file) {
      toast.error('Harap unggah minimal 1 foto bukti dapur/fasilitas.');
      return;
    }

    setIsSubmitting(true);
    const inspectionData = {
      ...scores,
      canteen_id: selectedCanteen,
      notes: notes,
      request_id: reqIdParam,
    };

    const res = await createInspection(inspectionData, file);
    
    if (res.success) {
      toast.success('Laporan audit berhasil disimpan!');
      navigate('/dashboard/auditor');
    } else {
      toast.error('Gagal menyimpan laporan: ' + res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-5 bg-slate-50">
            <h1 className="text-xl font-extrabold text-slate-900">Buat Laporan Audit Sanitasi Baru</h1>
            <p className="text-sm text-slate-500 mt-1">Lengkapi form di bawah ini sesuai dengan kondisi riil di lapangan.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            
            {/* Section 1: Kantin */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Identitas Kantin</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Kantin / Stand Makanan</label>
                <select 
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                  value={selectedCanteen}
                  onChange={(e) => setSelectedCanteen(e.target.value)}
                  disabled={loadingCanteens || !!canteenIdParam}
                >
                  <option value="">-- Pilih Kantin --</option>
                  {canteens.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.faculty_location})</option>
                  ))}
                </select>
                {canteenIdParam && <p className="text-xs text-emerald-600 mt-1 font-medium">Kantin telah dipilih dari jadwal pengajuan.</p>}
              </div>
            </section>

            {/* Section 2: Skor & Grade */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Penilaian Kesmas</h2>
              <AuditScoreCalculator onScoreChange={handleScoreChange} />
            </section>

            {/* Section 3: Foto Bukti */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Dokumentasi Bukti Lapangan</h2>
              <FileUploader onFileSelect={(f) => setFile(f)} maxSizeMB={5} />
            </section>

            {/* Section 4: Catatan Tambahan */}
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Catatan & Rekomendasi</h2>
              <textarea 
                rows="4"
                className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-emerald-500 focus:border-emerald-500 placeholder-slate-400"
                placeholder="Tuliskan temuan masalah atau rekomendasi perbaikan untuk pemilik kantin..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
            </section>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200 flex justify-end">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Menyimpan...</>
                ) : (
                  <><Save className="w-5 h-5" /> Simpan Hasil Audit</>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
