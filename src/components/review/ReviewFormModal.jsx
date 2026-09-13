import React, { useState } from 'react';
import { useReviews } from '../../hooks/useReviews';
import { Star, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const ReviewFormModal = ({ isOpen, onClose, canteenId, canteenName, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  
  const { submitReview, loading } = useReviews();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Silakan berikan rating bintang terlebih dahulu.');
      return;
    }

    const res = await submitReview(canteenId, rating, comment);
    if (res.success) {
      toast.success('Ulasan Anda berhasil dikirim!');
      setRating(0);
      setComment('');
      if (onSuccess) onSuccess();
      onClose();
    } else {
      toast.error(res.error || 'Gagal mengirim ulasan.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
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
              className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-emerald-500 focus:outline-none resize-none"
              placeholder="Ceritakan tentang kebersihan, pelayanan, dan kualitas makanan di sini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
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
    </div>
  );
};
