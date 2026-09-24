import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCanteens } from '../hooks/useCanteens';
import { useAuth } from '../context/AuthContext';
import { GradeBadge } from '../components/canteen/GradeBadge';
import { ReviewFormModal } from '../components/review/ReviewFormModal';
import { MapPin, Calendar, CheckCircle2, AlertCircle, Droplets, Trash2, Utensils, Star, User, X, Camera } from 'lucide-react';

export default function CanteenDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { canteenDetail, loading, error, getCanteenDetail } = useCanteens();
  const { user, profile } = useAuth();
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedPhotoReview, setSelectedPhotoReview] = useState(null);
  const [selectedInspectionPhoto, setSelectedInspectionPhoto] = useState(null);

  useEffect(() => {
    if (id) {
      getCanteenDetail(id);
    }
  }, [id, getCanteenDetail]);

  const handleOpenReview = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsReviewModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex justify-center">
        <div className="flex flex-col items-center gap-4 mt-20">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
          <p className="text-sm font-medium text-slate-500 animate-pulse">Memuat detail kantin...</p>
        </div>
      </div>
    );
  }

  if (error || !canteenDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
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
  const reviewsWithPhotos = reviews.filter(r => r.photo_url);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Banner Hero */}
      <div className="relative h-64 md:h-80 w-full bg-slate-900">
        <img 
          src={canteenDetail.banner_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'} 
          alt={canteenDetail.name} 
          className="w-full h-full object-cover opacity-60" 
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'; }}
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
                  <div 
                    className="relative h-48 cursor-pointer overflow-hidden rounded-xl group border border-slate-200"
                    onClick={() => setSelectedInspectionPhoto(latestInspection)}
                  >
                    <img 
                      src={latestInspection.proof_photo_url} 
                      alt="Bukti Dapur" 
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md text-sm">Lihat Detail</span>
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-white font-medium drop-shadow-md">Audit Resmi</span>
                    </div>
                  </div>
                  {/* Jika multiple foto, map array di sini */}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  <p className="text-slate-500 text-sm">Tidak ada foto dokumentasi yang diunggah pada audit terakhir.</p>
                </div>
              )}
            </section>
            {/* Galeri Komunitas / Foto Mahasiswa */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                <Camera className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900">Foto dari Pengunjung/Mahasiswa</h2>
              </div>
              
              {reviewsWithPhotos.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {reviewsWithPhotos.map((review) => (
                    <div 
                      key={`gallery-${review.id}`} 
                      className="relative aspect-square cursor-pointer overflow-hidden rounded-xl group"
                      onClick={() => setSelectedPhotoReview(review)}
                    >
                      <img 
                        src={review.photo_url} 
                        alt="Foto dari pengunjung" 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-white font-medium drop-shadow-md">{review.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                  <p className="text-slate-500 text-sm">Belum ada foto yang dibagikan oleh pengunjung.</p>
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
              {profile?.role !== 'tenant' && profile?.role !== 'auditor' && (
                <button 
                  onClick={handleOpenReview}
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Beri Ulasan
                </button>
              )}
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
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center overflow-hidden border border-emerald-200">
                          {review.profiles?.avatar_url ? (
                            <img src={review.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            review.profiles?.full_name?.charAt(0) || <User className="w-4 h-4 text-slate-500" />
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
                      <p className="text-sm text-slate-600 mt-2">{review.comment}</p>
                      {review.photo_url && (
                        <div 
                          className="mt-3 relative w-24 h-24 rounded-lg overflow-hidden cursor-pointer group border border-slate-200"
                          onClick={() => setSelectedPhotoReview(review)}
                        >
                          <img src={review.photo_url} alt="Review attachment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                      )}
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

      <ReviewFormModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        canteenId={canteenDetail.id}
        canteenName={canteenDetail.name}
        onSuccess={() => getCanteenDetail(canteenDetail.id)}
      />

      {/* Lightbox Modal */}
      {selectedPhotoReview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-in fade-in">
          <button 
            onClick={() => setSelectedPhotoReview(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col md:flex-row w-full max-w-5xl h-[80vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            {/* Image Container */}
            <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px]">
              <img 
                src={selectedPhotoReview.photo_url} 
                alt="Review detail" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Review Detail Panel */}
            <div className="w-full md:w-80 bg-white p-6 flex flex-col h-full overflow-y-auto">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center overflow-hidden border border-emerald-200 shrink-0">
                  {selectedPhotoReview.profiles?.avatar_url ? (
                    <img src={selectedPhotoReview.profiles.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    selectedPhotoReview.profiles?.full_name?.charAt(0) || <User className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{selectedPhotoReview.profiles?.full_name}</p>
                  <span className="text-xs text-slate-500">
                    {new Date(selectedPhotoReview.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < selectedPhotoReview.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                ))}
              </div>
              
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {selectedPhotoReview.comment}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Inspection Photo */}
      {selectedInspectionPhoto && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-in fade-in">
          <button 
            onClick={() => setSelectedInspectionPhoto(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col md:flex-row w-full max-w-5xl h-[80vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            {/* Image Container */}
            <div className="flex-1 bg-black flex items-center justify-center relative min-h-[300px]">
              <img 
                src={selectedInspectionPhoto.proof_photo_url} 
                alt="Dokumentasi Audit" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Inspection Detail Panel */}
            <div className="w-full md:w-80 bg-white p-6 flex flex-col h-full overflow-y-auto">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center overflow-hidden border border-emerald-200 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Audit Resmi</p>
                  <span className="text-xs text-slate-500">
                    {new Date(selectedInspectionPhoto.inspected_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <GradeBadge grade={selectedInspectionPhoto.grade} className="shadow-sm inline-block" />
                <p className="text-sm text-slate-500 mt-2 font-medium">Skor Total: <span className="text-slate-900 font-bold">{selectedInspectionPhoto.total_score}/100</span></p>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">Catatan Auditor:</h4>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedInspectionPhoto.notes || 'Tidak ada catatan tambahan.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
