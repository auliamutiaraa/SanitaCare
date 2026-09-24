import React from 'react';
import { CalendarDays, ClipboardCheck, Calculator, Eye } from 'lucide-react';

/**
 * Komponen HowItWorksSection untuk merender antarmuka pengguna.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: 'Pengajuan / Jadwal Audit',
      description: 'Kantin mengajukan jadwal atau tim kami merencanakan kunjungan rutin.',
      icon: CalendarDays,
    },
    {
      id: 2,
      title: 'Pemeriksaan Sanitasi Fisik oleh Kesmas',
      description: 'Tim auditor kesehatan masyarakat melakukan inspeksi langsung ke lokasi kantin.',
      icon: ClipboardCheck,
    },
    {
      id: 3,
      title: 'Kalkulasi Otomatis Skor & Grade',
      description: 'Sistem SanitaCare menghitung hasil inspeksi secara otomatis untuk menentukan grade.',
      icon: Calculator,
    },
    {
      id: 4,
      title: 'Transparansi Hasil ke Publik',
      description: 'Informasi grade dan detail sanitasi ditampilkan di platform untuk diakses semua pihak.',
      icon: Eye,
    },
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
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">Alur Kerja Audit</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Bagaimana SanitaCare memastikan transparansi dan akurasi dalam setiap penilaian kantin.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line - hidden on mobile, visible on md and up */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <article key={step.id} className="flex flex-col items-center text-center group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2">
                <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center shadow-lg mb-6 relative group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold border-4 border-white group-hover:scale-110 transition-transform duration-300">
                    {step.id}
                  </div>
                  <step.icon className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 px-2">{step.title}</h3>
                <p className="text-sm text-slate-600 px-4">{step.description}</p>
                
                {/* Mobile connecting line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-1 h-12 bg-slate-100 my-4"></div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
