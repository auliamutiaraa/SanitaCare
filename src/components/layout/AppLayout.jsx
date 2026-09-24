import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * Komponen AppLayout untuk merender antarmuka pengguna.
 * @param {Object} props - Properti untuk komponen ini.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export function AppLayout({ children }) {
  return (
    <div className="relative w-full h-full flex flex-col flex-1 bg-[#faf9f4]">
      {/* Background Waves (Fixed so they cover the viewport behind everything) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-[85vw] md:w-[55vw] text-[#d8e5d3]" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 600H1000C1000 600 800 450 500 350C200 250 50 100 0 0V600Z" fill="currentColor"/>
        </svg>
        <svg className="absolute top-[10%] right-0 w-[70vw] md:w-[45vw] text-[#e2ede0]" viewBox="0 0 800 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M800 0V1000C800 1000 600 800 400 600C200 400 50 250 0 100C0 100 200 50 800 0Z" fill="currentColor"/>
        </svg>
      </div>

      {/* Content slot */}
      <div className="relative z-10 w-full flex-1 flex flex-col">
        {children || <Outlet />}
      </div>
    </div>
  );
}
