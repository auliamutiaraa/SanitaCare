import React from 'react';
import { CalendarDays, ClipboardCheck, Calculator, Eye } from 'lucide-react';

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
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center shadow-lg mb-6 relative">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold border-4 border-white">
                    {step.id}
                  </div>
                  <step.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 px-2">{step.title}</h3>
                <p className="text-sm text-slate-600 px-4">{step.description}</p>
                
                {/* Mobile connecting line */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-1 h-12 bg-slate-100 my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
