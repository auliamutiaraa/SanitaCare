import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, HardHat, Landmark, Stethoscope, Scale, Users, Monitor, Sprout, BookOpen, Microscope } from 'lucide-react';

const faculties = [
  { id: 'FKM', name: 'Kesehatan Masyarakat', icon: HeartPulse, count: 8 },
  { id: 'FT', name: 'Teknik', icon: HardHat, count: 12 },
  { id: 'FE', name: 'Ekonomi', icon: Landmark, count: 15 },
  { id: 'FK', name: 'Kedokteran', icon: Stethoscope, count: 5 },
  { id: 'FH', name: 'Hukum', icon: Scale, count: 7 },
  { id: 'FISIP', name: 'Ilmu Sosial & Ilmu Politik', icon: Users, count: 9 },
  { id: 'Fasilkom', name: 'Ilmu Komputer', icon: Monitor, count: 11 },
  { id: 'FP', name: 'Pertanian', icon: Sprout, count: 10 },
  { id: 'FKIP', name: 'Keguruan & Ilmu Pendidikan', icon: BookOpen, count: 14 },
  { id: 'MIPA', name: 'MIPA', icon: Microscope, count: 6 },
];

export function FacultySection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Eksplorasi Kantin Fakultas</h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            Temukan kantin terverifikasi di setiap fakultas Universitas Sriwijaya.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {faculties.map((faculty) => (
            <button
              key={faculty.id}
              onClick={() => navigate(`/canteens?faculty=${faculty.id}`)}
              className="flex flex-col items-center p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all group text-center"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <faculty.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{faculty.id}</h3>
              <p className="text-xs text-slate-500 mb-3">{faculty.name}</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                {faculty.count} Kantin
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
