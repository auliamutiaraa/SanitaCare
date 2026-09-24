import React from 'react';
import { ShieldCheck, Users, Activity } from 'lucide-react';

/**
 * Komponen MetricsSection untuk merender antarmuka pengguna.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export function MetricsSection() {
  return (
    <section className="bg-white pb-12 pt-2 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 md:-mt-10 relative z-20">
        <div className="rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-100 shadow-xl shadow-emerald-900/5 p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-50 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl group">
              <div className="w-14 h-14 mx-auto bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-extrabold text-3xl md:text-4xl mb-2">
                120+
              </h3>
              <p className="text-slate-600 font-medium">Total Audit Selesai</p>
            </div>
            
            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-50 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl group">
              <div className="w-14 h-14 mx-auto bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="bg-gradient-to-r from-teal-500 to-emerald-600 bg-clip-text text-transparent font-extrabold text-3xl md:text-4xl mb-2">
                85%
              </h3>
              <p className="text-slate-600 font-medium">Kantin Grade A & B</p>
            </div>
            
            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-50 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl group">
              <div className="w-14 h-14 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent font-extrabold text-3xl md:text-4xl mb-2">
                5k+
              </h3>
              <p className="text-slate-600 font-medium">Komunitas Mahasiswa</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
