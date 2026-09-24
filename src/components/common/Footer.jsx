import React from 'react';
import { Leaf } from 'lucide-react';
import logoUnsri from '../../assets/logo-unsri.png';
import logoSanitacare from '../../assets/logo-sanitacare.png';

/**
 * Komponen Footer untuk merender antarmuka pengguna.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export const Footer = () => {
  return (
    <footer className="relative z-20 bg-[#0f2e22] text-[#edf4d5] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoUnsri} 
                alt="Logo UNSRI" 
                className="w-8 h-8 object-contain"
              />
              <div className="w-px h-6 bg-white/20 hidden sm:block mx-1"></div>
              <div className="flex items-center gap-1.5">
                <img src={logoSanitacare} alt="Logo" className="w-8 h-8 object-contain" />
                <div className="flex flex-col justify-center">
                  <span 
                    className="font-semibold text-xl text-[#ffffff] tracking-tight leading-tight font-cooper"
                  >
                    SanitaCare
                  </span>
                  <span className="text-[10px] text-[#dae9b0] font-medium uppercase tracking-wider leading-none mt-0.5">Sriwijaya University</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#edf4d5] max-w-xs leading-relaxed">
              Sistem Informasi Transparansi Sanitasi & Kebersihan Kantin Kampus Universitas Sriwijaya.
            </p>
          </div>
          <div>
            <h4 
              className="text-[#ffffff] font-semibold mb-4 text-lg font-cooper"
            >
              Tautan Pantas
            </h4>
            <ul className="space-y-2 text-sm text-[#edf4d5]">
              <li><a href="/" className="hover:text-white transition-colors">Beranda</a></li>
              <li><a href="/canteens" className="hover:text-white transition-colors">Katalog Kantin</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Masuk Akun</a></li>
            </ul>
          </div>
          <div>
            <h4 
              className="text-[#ffffff] font-semibold mb-4 text-lg font-cooper"
            >
              Kontak Info
            </h4>
            <ul className="space-y-2 text-sm text-[#edf4d5]">
              <li>Universitas Sriwijaya</li>
              <li>Indralaya, Ogan Ilir</li>
              <li>Sumatera Selatan</li>
              <li>Email: support@sanitacare.unsri.ac.id</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[#dae9b0]">
          <p>&copy; {new Date().getFullYear()} SanitaCare - Universitas Sriwijaya. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed by Aulia Mutiara Sari</p>
        </div>
      </div>
    </footer>
  );
};
