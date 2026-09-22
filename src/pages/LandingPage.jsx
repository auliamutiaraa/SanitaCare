import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Users, Activity } from 'lucide-react';
import { useCanteens } from '../hooks/useCanteens';
import { CanteenCard } from '../components/canteen/CanteenCard';
import { FacultySection } from '../components/landing/FacultySection';
import { GradeGuideSection } from '../components/landing/GradeGuideSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';

export default function LandingPage() {
  const { canteens, loading, fetchCanteens } = useCanteens();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCanteens({ grades: ['A'], limit: 3 });
  }, [fetchCanteens]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      navigate(`/canteens?search=${query}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543352634-99a5d50ae78e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/30 border border-emerald-400/30 backdrop-blur-sm text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-200" />
            <span className="text-emerald-50">Sistem Keamanan Pangan Tersertifikasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Temukan <span className="text-emerald-200">Kantin Kampus Sehat</span> <br className="hidden md:block"/> & Higienis
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-emerald-100 mb-10">
            SanitaCare memastikan transparansi sanitasi dan kebersihan setiap kantin di lingkungan kampus Universitas Sriwijaya untuk kesehatan Anda.
          </p>
          
          <form onSubmit={handleSearch} className="w-full max-w-2xl flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="search"
                className="block w-full pl-11 pr-4 py-4 rounded-xl border-0 ring-1 ring-inset ring-slate-200 bg-white text-slate-900 shadow-lg focus:ring-2 focus:ring-inset focus:ring-emerald-500 text-base"
                placeholder="Cari nama stand atau makanan..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl shadow-lg transition-colors"
            >
              Cari Kantin
            </button>
          </form>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 mx-auto bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">120+</h3>
              <p className="text-slate-600 font-medium">Total Audit Selesai</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 mx-auto bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">85%</h3>
              <p className="text-slate-600 font-medium">Kantin Grade A & B</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 mx-auto bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">5k+</h3>
              <p className="text-slate-600 font-medium">Komunitas Mahasiswa</p>
            </div>
          </div>
        </div>
      </section>

      <FacultySection />
      <HowItWorksSection />
      <GradeGuideSection />

      {/* Featured Canteens */}
      <section className="py-16 bg-slate-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Rekomendasi Terbaik</h2>
              <p className="text-slate-600 mt-2">Kantin dengan standar kebersihan tertinggi (Grade A)</p>
            </div>
            <Link to="/canteens" className="hidden sm:inline-flex text-emerald-600 font-semibold hover:text-emerald-700">
              Lihat Semua &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {canteens.map(canteen => (
                <CanteenCard key={canteen.id} canteen={canteen} />
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/canteens" className="inline-flex text-emerald-600 font-semibold hover:text-emerald-700">
              Lihat Semua &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
