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
      <section className="relative bg-[#faf9f4] overflow-hidden pt-24 pb-40 md:pt-32 md:pb-48">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           {/* Decorative Waves in Hero Background */}
           <svg className="absolute top-0 right-0 w-[50vw] text-[#e2ede0]" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
             <path d="M800 0V1000C800 1000 600 800 400 600C200 400 50 250 0 100C0 100 200 50 800 0Z" fill="currentColor"/>
           </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#009a60]/10 border border-[#009a60]/20 text-sm font-semibold text-[#009a60] mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Sistem Keamanan Pangan Tersertifikasi</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f2e22] mb-6">
            Temukan <span className="text-[#009a60]">Kantin Kampus Sehat</span> <br className="hidden md:block"/> & Higienis
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-slate-600 mb-10">
            SanitaCare memastikan transparansi sanitasi dan kebersihan setiap kantin di lingkungan kampus Universitas Sriwijaya untuk kesehatan Anda.
          </p>
          
          <form onSubmit={handleSearch} className="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                name="search"
                className="block w-full pl-11 pr-4 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm focus:border-[#009a60] focus:ring-1 focus:ring-[#009a60] text-base transition-all outline-none"
                placeholder="Cari nama stand atau makanan..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-[#009a60] hover:bg-[#008855] text-white font-bold rounded-2xl shadow-md transition-colors"
            >
              Cari Kantin
            </button>
          </form>
        </div>
        
        {/* SVG Wave Divider to White */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg className="relative block w-full h-[60px] md:h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C63.2,21.56,128.46,47.45,193.3,64.2C236.4,75.46,279.4,80.7,321.39,56.44Z" fill="#ffffff"></path>
          </svg>
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
