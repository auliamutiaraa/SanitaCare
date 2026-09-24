import React from 'react';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import aboutImage from '../../assets/about-sanitacare.jpg';

/**
 * Komponen AboutSection untuk merender antarmuka pengguna.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export function AboutSection() {
  const points = [
    'Transparansi penuh skor sanitasi dan higienitas setiap kantin',
    'Audit rutin oleh tim ahli kesehatan masyarakat',
    'Meningkatkan kesadaran akan pentingnya keamanan pangan kampus',
  ];

  return (
    <section className="relative py-16 bg-[#faf9f4] overflow-hidden">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 transform rotate-180">
        <svg className="relative block w-full h-[40px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.2,21.56,128.46,47.45,193.3,64.2C236.4,75.46,279.4,80.7,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Kiri: Ilustrasi/Foto */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative group overflow-hidden rounded-3xl shadow-xl border border-slate-100 aspect-[4/3]">
              <img 
                src={aboutImage} 
                alt="Sanitasi dapur bersih" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply pointer-events-none"></div>
              
              {/* Floating Badge 1 (Pojok Kiri Bawah) */}
              <div className="absolute bottom-6 left-6 animate-pulse backdrop-blur-md bg-white/90 border border-white/50 shadow-lg rounded-2xl p-3 flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                  <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="font-bold text-xs sm:text-sm text-slate-900">Terverifikasi Kesmas</p>
                  <p className="text-[10px] sm:text-xs text-slate-500">Standar Sanitasi Teruji</p>
                </div>
              </div>

              {/* Floating Badge 2 (Pojok Kanan Atas) */}
              <div 
                className="absolute top-6 right-6 backdrop-blur-md bg-white/90 border border-white/50 shadow-lg rounded-2xl p-3 flex items-center gap-2 transition-transform hover:-translate-y-1 animate-float"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                <p className="font-bold text-[10px] sm:text-xs text-slate-900">100% Transparan</p>
              </div>
            </div>
            
            {/* Dekorasi latar belakang */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-emerald-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 -z-10"></div>
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-teal-100 rounded-full mix-blend-multiply filter blur-2xl opacity-70 -z-10"></div>
          </div>

          {/* Kanan: Teks Edukasi */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-6 w-max border border-emerald-100">
              Tentang SanitaCare
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              Mewujudkan Ekosistem Kampus yang Sehat & Aman
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Kami percaya bahwa setiap mahasiswa berhak mendapatkan akses ke makanan yang bersih dan higienis. SanitaCare hadir untuk menjembatani transparansi antara pengelola kantin dan mahasiswa melalui audit sanitasi terstandarisasi.
            </p>
            
            <ul className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
}
