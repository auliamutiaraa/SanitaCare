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
import heroImage from '../assets/hero-canteen-new.jpg';

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
      <section className="relative bg-[#faf9f4] pt-8 lg:pt-6 overflow-hidden min-h-[calc(100vh-80px)]">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 pb-20 lg:pb-32">
          
          {/* Kiri: Teks & Search */}
          <div className="w-full lg:w-[50%] flex flex-col items-start text-left pt-4 lg:pt-0 lg:pb-12 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f4ec] text-xs font-semibold text-[#009a60] mb-5">
              <ShieldCheck className="w-4 h-4" />
              <span>Sistem Keamanan Pangan Tersertifikasi</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#0f2e22] mb-5 leading-[1.15]">
              Temukan <br className="hidden lg:block"/>
              <span className="text-[#009a60]">Kantin Kampus Sehat</span> <br />
              & Higienis
            </h1>
            
            <p className="max-w-lg text-base lg:text-lg text-slate-500 mb-8 leading-relaxed">
              SanitaCare memastikan transparansi sanitasi dan kebersihan setiap kantin di lingkungan kampus Universitas Sriwijaya untuk kesehatan Anda.
            </p>
            
            <form onSubmit={handleSearch} className="w-full flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-sm border border-slate-100 max-w-lg">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  name="search"
                  className="block w-full pl-11 pr-4 py-3 rounded-xl border-0 bg-transparent text-slate-900 focus:ring-0 text-sm lg:text-base transition-all outline-none"
                  placeholder="Cari nama stand atau makanan..."
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#009a60] hover:bg-[#008855] text-white font-bold rounded-xl transition-colors whitespace-nowrap text-sm lg:text-base"
              >
                Cari Kantin
              </button>
            </form>
          </div>
          
          {/* Kanan: Gambar Curve Transparan */}
          <div className="w-full lg:w-[50%] flex justify-end z-0 mt-10 lg:mt-0 lg:-mr-12 xl:-mr-16">
            <div className="relative w-full max-w-[580px] h-[350px] sm:h-[400px] lg:h-[480px] xl:h-[520px] rounded-tl-[120px] sm:rounded-tl-[150px] lg:rounded-tl-[200px] rounded-bl-[120px] sm:rounded-bl-[150px] lg:rounded-bl-[200px] overflow-hidden border-l-[10px] lg:border-l-[12px] border-[#009a60] bg-transparent">
              <img 
                src={heroImage} 
                alt="Kantin Kampus Bersih" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

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
