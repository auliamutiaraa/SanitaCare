import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';

export function GradeGuideSection() {
  return (
    <section className="relative py-16 bg-[#faf9f4] overflow-hidden">
      {/* Wave from top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 transform rotate-180">
        <svg className="relative block w-full h-[40px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.2,21.56,128.46,47.45,193.3,64.2C236.4,75.46,279.4,80.7,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Panduan Indikator Grade</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Standar penilaian kesehatan masyarakat yang diterapkan SanitaCare untuk setiap kantin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Grade A */}
          <div className="bg-white p-8 rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-bl-full -z-0"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Grade A</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 mb-4">
                Sangat Higienis / Skor {'>'} 85
              </div>
              <p className="text-slate-600 leading-relaxed">
                Dapur bersih, fasilitas air & limbah teruji. Memenuhi standar tertinggi keamanan dan kebersihan pangan.
              </p>
            </div>
          </div>

          {/* Grade B */}
          <div className="bg-white p-8 rounded-2xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-bl-full -z-0"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Grade B</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800 mb-4">
                Cukup Higienis / Skor 70–84
              </div>
              <p className="text-slate-600 leading-relaxed">
                Memenuhi syarat dasar operasional, namun masih memerlukan beberapa perbaikan minor pada fasilitas tertentu.
              </p>
            </div>
          </div>

          {/* Grade C */}
          <div className="bg-white p-8 rounded-2xl border border-rose-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100 rounded-bl-full -z-0"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Grade C</h3>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 mb-4">
                Perlu Perbaikan / Skor {'<'} 70
              </div>
              <p className="text-slate-600 leading-relaxed">
                Dalam pengawasan ketat & butuh evaluasi segera. Terdapat ketidaksesuaian standar kebersihan yang signifikan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
