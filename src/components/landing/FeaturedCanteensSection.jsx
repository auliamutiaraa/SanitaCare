import React from 'react';
import { Link } from 'react-router-dom';
import { CanteenCard } from '../canteen/CanteenCard';
import { ArrowRight } from 'lucide-react';

export function FeaturedCanteensSection({ canteens, loading }) {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Wave from top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-0 transform rotate-180">
        <svg className="relative block w-full h-[40px] md:h-[80px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.2,21.56,128.46,47.45,193.3,64.2C236.4,75.46,279.4,80.7,321.39,56.44Z" fill="#faf9f4"></path>
        </svg>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {/* Header Area */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
          <div>
            <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              ✨ PILIHAN TERATAS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Rekomendasi Terbaik
            </h2>
            <p className="text-slate-600 mt-2">
              Kantin dengan standar kebersihan tertinggi (Grade A)
            </p>
          </div>
          <Link 
            to="/canteens" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-200 text-emerald-700 font-semibold hover:bg-emerald-600 hover:text-white transition-all text-sm group"
          >
            Lihat Semua
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Card Grid Area */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-96 border border-slate-100">
                <div className="h-48 bg-slate-200 rounded-t-2xl"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-2/3"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                  <div className="h-10 bg-slate-200 rounded mt-8"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {canteens.map(canteen => (
              <CanteenCard key={canteen.id} canteen={canteen} />
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}
