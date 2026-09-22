import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, Users, Activity } from 'lucide-react';
import { useCanteens } from '../hooks/useCanteens';
import { CanteenCard } from '../components/canteen/CanteenCard';
import { FacultySection } from '../components/landing/FacultySection';
import { GradeGuideSection } from '../components/landing/GradeGuideSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { AboutSection } from '../components/landing/AboutSection';
import { RecentReviewsSection } from '../components/landing/RecentReviewsSection';
import { FaqSection } from '../components/landing/FaqSection';
import { MetricsSection } from '../components/landing/MetricsSection';
import { FeaturedCanteensSection } from '../components/landing/FeaturedCanteensSection';

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

      <MetricsSection />
      <FacultySection />
      <FeaturedCanteensSection canteens={canteens} loading={loading} />
      <AboutSection />
      <HowItWorksSection />
      <GradeGuideSection />
      <RecentReviewsSection />
      <FaqSection />
    </div>
  );
}
