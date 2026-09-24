import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useReviews } from '../../hooks/useReviews';
import { Star, X } from 'lucide-react';
import { toast } from 'sonner';

/**
 * Komponen ReviewFormModal untuk merender antarmuka pengguna.
 * @param {Object} props - Properti untuk komponen ini.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export const ReviewFormModal = ({ isOpen, onClose, canteenId, canteenName, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  
  const { submitReview, loading } = useReviews();

  if (!isOpen) return null;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ukuran foto maksimal 5MB');
        return;
      }
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Silakan berikan rating bintang terlebih dahulu.');
      return;
    }

    const res = await submitReview(canteenId, rating, comment, photo);
    if (res.success) {
      toast.success('Ulasan Anda berhasil dikirim!');
      setRating(0);
      setComment('');
      setPhoto(null);
      setPhotoPreview(null);
      if (onSuccess) onSuccess();
      onClose();
    } else {
      toast.error(res.error || 'Gagal mengirim ulasan.');
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900">Tulis Ulasan</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-slate-500 mb-4">
            Bagaimana pengalaman Anda saat makan di <span className="font-semibold text-slate-700">{canteenName}</span>?
          </p>

          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star 
                  className={`w-10 h-10 transition-colors ${
                    (hoveredRating || rating) >= star 
                      ? 'text-amber-400 fill-amber-400' 
                      : 'text-slate-200 fill-slate-200'
                  }`} 
                />
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">Ulasan Anda</label>
            <textarea
              required
              rows="4"
              className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-emerald-500 focus:outline-none resize-none mb-4"
              placeholder="Ceritakan tentang kebersihan, pelayanan, dan kualitas makanan di sini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <label className="block text-sm font-medium text-slate-700 mb-2">Unggah Foto (Opsional)</label>
            {!photoPreview ? (
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Klik untuk unggah</span> atau seret foto kesini</p>
                    <p className="text-xs text-slate-500">PNG, JPG, atau JPEG (Maks. 5MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handlePhotoChange} />
                </label>
              </div>
            ) : (
              <div className="relative inline-block mt-2">
                <img src={photoPreview} alt="Preview" className="h-32 rounded-lg border border-slate-200 object-cover" />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors disabled:opacity-70"
            >
              {loading ? 'Mengirim...' : 'Kirim Ulasan'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
