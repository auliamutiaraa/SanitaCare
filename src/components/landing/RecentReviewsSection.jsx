import React from 'react';
import { Star } from 'lucide-react';

export function RecentReviewsSection() {
  const reviews = [
    {
      id: 1,
      studentName: 'Budi Santoso',
      faculty: 'Fasilkom',
      rating: 5,
      canteenName: 'Kantin Bu Tin (Fasilkom)',
      comment: 'Tempatnya bersih banget, pelayanannya ramah, dan makanannya tertutup rapat. Top!',
      foodImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://i.pravatar.cc/150?u=budi'
    },
    {
      id: 2,
      studentName: 'Siti Aminah',
      faculty: 'FKM',
      rating: 4,
      canteenName: 'Kantin FKM Sehat',
      comment: 'Higienis sesuai standar. Hanya saja antriannya lumayan panjang kalau jam makan siang.',
      foodImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://i.pravatar.cc/150?u=siti'
    },
    {
      id: 3,
      studentName: 'Andi Pratama',
      faculty: 'FT',
      rating: 5,
      canteenName: 'Kantin Teknik Sipil',
      comment: 'Semenjak ada SanitaCare jadi lebih yakin makan di sini. Dapur terlihat rapi dan bersih.',
      foodImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
      avatar: 'https://i.pravatar.cc/150?u=andi'
    }
  ];

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Wave from top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 transform rotate-180">
        <svg className="relative block w-full h-[40px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.2,21.56,128.46,47.45,193.3,64.2C236.4,75.46,279.4,80.7,321.39,56.44Z" fill="#faf9f4"></path>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900">Suara Mahasiswa</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Ulasan terbaru dari mahasiswa Universitas Sriwijaya mengenai kantin kampus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              {/* Foto Makanan */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={review.foodImage} 
                  alt={`Makanan di ${review.canteenName}`} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {review.rating}.0
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <img src={review.avatar} alt={review.studentName} className="w-10 h-10 rounded-full border border-slate-200" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{review.studentName}</p>
                    <p className="text-xs text-slate-500">{review.faculty}</p>
                  </div>
                </div>
                
                <h4 className="font-semibold text-emerald-700 mb-2 text-sm">{review.canteenName}</h4>
                <p className="text-slate-600 text-sm flex-1 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
