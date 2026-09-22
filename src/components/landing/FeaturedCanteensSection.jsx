import React from 'react';
import { Link } from 'react-router-dom';
import { CanteenCard } from '../canteen/CanteenCard';
import { ArrowRight } from 'lucide-react';

export function FeaturedCanteensSection({ canteens, loading }) {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
