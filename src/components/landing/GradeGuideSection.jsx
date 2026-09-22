import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';

export function GradeGuideSection() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
