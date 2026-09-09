import React from 'react';
import { Leaf } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-emerald-500" />
              <span className="font-extrabold text-2xl text-white">SanitaCare</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              Sistem Informasi Transparansi Sanitasi & Kebersihan Kantin Kampus Universitas Sriwijaya.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Tautan Pantas</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-emerald-400 transition-colors">Beranda</a></li>
              <li><a href="/canteens" className="hover:text-emerald-400 transition-colors">Katalog Kantin</a></li>
              <li><a href="/login" className="hover:text-emerald-400 transition-colors">Masuk Akun</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Kontak Info</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Universitas Sriwijaya</li>
              <li>Indralaya, Ogan Ilir</li>
              <li>Sumatera Selatan</li>
              <li>Email: support@sanitacare.unsri.ac.id</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} SanitaCare - GDGoC UNSRI Final Project. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed by Aulia Mutiara Sari</p>
        </div>
      </div>
    </footer>
  );
};
