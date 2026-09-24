import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';

export function GradeGuideSection() {
  const [activeTab, setActiveTab] = useState('A');

  const grades = {
    A: {
      id: 'A',
      title: 'Grade A',
      score: 'Sangat Higienis / Skor > 85',
      desc: 'Dapur bersih, fasilitas air & limbah teruji. Memenuhi standar tertinggi keamanan dan kebersihan pangan.',
      icon: ShieldCheck,
      badgeColor: 'bg-emerald-100 text-emerald-800',
      iconBg: 'bg-emerald-100 text-emerald-600',
      borderColor: 'border-emerald-200',
      decorBg: 'bg-emerald-50',
      tabClass: 'bg-emerald-600 text-white shadow-emerald-200'
    },
    B: {
      id: 'B',
      title: 'Grade B',
      score: 'Cukup Higienis / Skor 70–84',
      desc: 'Memenuhi syarat dasar operasional, namun masih memerlukan beberapa perbaikan minor pada fasilitas tertentu.',
      icon: AlertCircle,
      badgeColor: 'bg-amber-100 text-amber-800',
      iconBg: 'bg-amber-100 text-amber-600',
      borderColor: 'border-amber-200',
      decorBg: 'bg-amber-50',
      tabClass: 'bg-amber-500 text-white shadow-amber-200'
    },
    C: {
      id: 'C',
      title: 'Grade C',
      score: 'Perlu Perbaikan / Skor < 70',
      desc: 'Dalam pengawasan ketat & butuh evaluasi segera. Terdapat ketidaksesuaian standar kebersihan yang signifikan.',
      icon: AlertTriangle,
      badgeColor: 'bg-rose-100 text-rose-800',
      iconBg: 'bg-rose-100 text-rose-600',
      borderColor: 'border-rose-200',
      decorBg: 'bg-rose-50',
      tabClass: 'bg-rose-500 text-white shadow-rose-200'
    }
  };

  const current = grades[activeTab];
  const Icon = current.icon;

  return (
    <section className="relative py-16 bg-[#faf9f4] overflow-hidden">
      <style>
        {`
          @keyframes fadeSlideUp {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeSlideUp {
            animation: fadeSlideUp 0.3s ease-out forwards;
          }
          @keyframes gentleBounce {
            0%, 100% { transform: translateY(-5%); }
            50% { transform: translateY(0); }
          }
          .animate-gentleBounce {
            animation: gentleBounce 1.5s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* Wave from top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 transform rotate-180">
        <svg className="relative block w-full h-[40px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.2,21.56,128.46,47.45,193.3,64.2C236.4,75.46,279.4,80.7,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900">Panduan Indikator Grade</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Standar penilaian kesehatan masyarakat yang diterapkan SanitaCare untuk setiap kantin.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {Object.values(grades).map((grade) => (
            <button
              key={grade.id}
              onClick={() => setActiveTab(grade.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ease-in-out ${
                activeTab === grade.id
                  ? `${grade.tabClass} shadow-lg scale-105`
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              Grade {grade.id}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="max-w-2xl mx-auto">
          <div 
            key={activeTab} 
            className={`bg-white p-8 md:p-10 rounded-3xl border ${current.borderColor} shadow-lg relative overflow-hidden animate-fadeSlideUp`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${current.decorBg} rounded-bl-full -z-0 opacity-50`}></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-20 h-20 ${current.iconBg} rounded-full flex items-center justify-center mb-6 animate-gentleBounce shadow-md border-4 border-white`}>
                <Icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-3">{current.title}</h3>
              <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${current.badgeColor} mb-6`}>
                {current.score}
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                {current.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
