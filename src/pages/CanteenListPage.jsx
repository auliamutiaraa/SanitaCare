import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, X } from 'lucide-react';
import { useCanteens } from '../hooks/useCanteens';
import { CanteenCard } from '../components/canteen/CanteenCard';

export default function CanteenListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  
  const { canteens, loading, fetchCanteens } = useCanteens();
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const faculties = ['FKM', 'FT', 'FE', 'FK', 'FH', 'FISIP', 'FASILKOM', 'FKIP', 'MIPA', 'FP'];

  useEffect(() => {
    fetchCanteens({
      search: searchTerm,
      grades: selectedGrades,
      faculty: selectedFaculty
    });
  }, [searchTerm, selectedGrades, selectedFaculty, fetchCanteens]);

  const toggleGrade = (grade) => {
    setSelectedGrades(prev => 
      prev.includes(grade) 
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const resetFilter = () => {
    setSearchTerm('');
    setSelectedGrades([]);
    setSelectedFaculty('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Mobile Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Katalog Kantin</h1>
            <p className="text-slate-600 mt-1">
              Menampilkan {loading ? '...' : canteens.length} Kantin Terverifikasi
            </p>
          </div>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700"
          >
            <Filter className="w-4 h-4" /> Filter & Cari
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filter (Desktop) & Drawer (Mobile) */}
          <div className={`
            fixed inset-0 z-50 bg-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:w-64 md:bg-transparent md:p-0 md:z-0
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="flex items-center justify-between mb-6 md:hidden">
              <h2 className="text-lg font-bold text-slate-900">Filter</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Search */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Cari Kantin</h3>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Nama stand..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Grade Filter */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Grade Sanitasi</h3>
                <div className="space-y-3">
                  {['A', 'B', 'C'].map(grade => (
                    <label key={grade} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                        checked={selectedGrades.includes(grade)}
                        onChange={() => toggleGrade(grade)}
                      />
                      <span className="text-sm text-slate-700 font-medium">Grade {grade}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Faculty Filter */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Lokasi Fakultas</h3>
                <select 
                  className="block w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="">Semua Fakultas</option>
                  {faculties.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              <button 
                onClick={resetFilter}
                className="w-full py-2 px-4 border border-rose-200 text-rose-600 bg-rose-50 rounded-lg text-sm font-medium hover:bg-rose-100 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* Overlay Mobile */}
          {isMobileFilterOpen && (
            <div 
              className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            ></div>
          )}

          {/* Content Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
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
            ) : canteens.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Kantin tidak ditemukan</h3>
                <p className="text-slate-600 mb-6">
                  Tidak ada kantin dengan kriteria tersebut. Coba ubah kata kunci atau filter Anda.
                </p>
                <button 
                  onClick={resetFilter}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
                >
                  Hapus Semua Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {canteens.map(canteen => (
                  <CanteenCard key={canteen.id} canteen={canteen} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
