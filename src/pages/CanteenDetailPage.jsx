import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCanteens } from '../hooks/useCanteens';
import { GradeBadge } from '../components/canteen/GradeBadge';
import { MapPin, Calendar, CheckCircle2, AlertCircle, Droplets, Trash2, Utensils, Star, User } from 'lucide-react';

export default function CanteenDetailPage() {
  const { id } = useParams();
  const { canteenDetail, loading, error, getCanteenDetail } = useCanteens();

  useEffect(() => {
    if (id) {
      getCanteenDetail(id);
    }
  }, [id, getCanteenDetail]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 flex justify-center">
        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">Memuat detail kantin...</p>
        </div>
      </div>
    );
  }

  if (error || !canteenDetail) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl text-center max-w-md shadow-sm border border-slate-200">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Gagal Memuat Data</h2>
          <p className="text-slate-600">Kantin tidak ditemukan atau terjadi kesalahan jaringan.</p>
        </div>
      </div>
    );
  }

  const latestInspection = canteenDetail.inspections?.sort((a, b) => new Date(b.inspected_at) - new Date(a.inspected_at))[0];
  const reviews = canteenDetail.reviews || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Banner Hero */}
      <div className="relative h-64 md:h-80 w-full bg-slate-900">
        <img 
          src={canteenDetail.banner_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'} 
          alt={canteenDetail.name} 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <GradeBadge grade={canteenDetail.current_grade} className="shadow-lg border-none" />
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/30">
                  <MapPin className="w-3 h-3" />
                  {canteenDetail.faculty_location}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">{canteenDetail.name}</h1>
              <p className="text-slate-200 font-medium">Pemilik: {canteenDetail.profiles?.full_name}</p>
            </div>
            {latestInspection && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-white text-sm">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4" /> Tersertifikasi Higienis
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4" /> Audit: {new Date(latestInspection.inspected_at).toLocaleDateString('id-ID')}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Skor Audit Sanitasi */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Hasil Audit Kesehatan Lingkungan</h2>
              
              {latestInspection ? (
                <div className="space-y-6">
                  {/* Total Score */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">Total Skor Audit</p>
                      <p className="text-3xl font-extrabold text-slate-900">{latestInspection.total_score} <span className="text-base font-normal text-slate-500">/ 100</span></p>
                    </div>
                    <GradeBadge grade={latestInspection.grade} className="text-sm px-4 py-2" />
                  </div>

                  {/* Breakdown Scores */}
                  <div className="space-y-5">
                    {/* Sanitasi Air */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-slate-700 flex items-center gap-2"><Droplets className="w-4 h-4 text-blue-500"/> Sanitasi Air & Kualitas Fasilitas</span>
                        <span className="text-emerald-600 font-bold">{latestInspection.score_water} / 100</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${latestInspection.score_water}%` }}></div>
                      </div>
                    </div>

                    {/* Pengolahan Limbah */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-slate-700 flex items-center gap-2"><Trash2 className="w-4 h-4 text-amber-500"/> Pengolahan Sampah & Limbah</span>
                        <span className="text-emerald-600 font-bold">{latestInspection.score_waste} / 100</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${latestInspection.score_waste}%` }}></div>
                      </div>
                    </div>

                    {/* Higienitas Penjamah Makanan */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-slate-700 flex items-center gap-2"><Utensils className="w-4 h-4 text-rose-500"/> Higienitas Penjamah Makanan</span>
                        <span className="text-emerald-600 font-bold">{latestInspection.score_food_handling} / 100</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500 rounded-full transition-all duration-500" style={{ width: `${latestInspection.score_food_handling}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Catatan Auditor */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-2">Catatan & Rekomendasi Auditor:</h4>
                    <p className="text-slate-600 text-sm leading-relaxed bg-amber-50 p-4 rounded-xl border border-amber-100">
                      {latestInspection.notes || 'Tidak ada catatan tambahan.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">Belum ada riwayat audit untuk kantin ini.</p>
                </div>
              )}
            </section>

            {/* Galeri Bukti Dapur */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Galeri Dokumentasi Dapur</h2>
              {latestInspection?.proof_photo_url ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <img src={latestInspection.proof_photo_url} alt="Bukti Dapur" className="rounded-xl w-full h-48 object-cover border border-slate-200 hover:opacity-90 transition-opacity cursor-pointer" />
                  {/* Jika multiple foto, map array di sini */}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  <p className="text-slate-500 text-sm">Tidak ada foto dokumentasi yang diunggah pada audit terakhir.</p>
                </div>
              )}
            </section>

          </div>

          {/* Sidebar (Right Column) */}
          <div className="space-y-8">
            
            {/* Info Kantin */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Tentang Kantin</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {canteenDetail.description || 'Belum ada deskripsi untuk kantin ini.'}
              </p>
              <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm">
                Beri Ulasan
              </button>
            </section>

            {/* Ulasan Mahasiswa */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Ulasan Mahasiswa</h3>
                <span className="text-sm font-medium text-slate-500">{reviews.length} ulasan</span>
              </div>
              
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <div key={review.id} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                          {review.profiles?.avatar_url ? (
                            <img src={review.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{review.profiles?.full_name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                        <span className="ml-auto text-xs text-slate-400">
                          {new Date(review.created_at).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 text-center py-4">Belum ada ulasan.</p>
                )}
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}
