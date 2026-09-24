import React from 'react';
import { clsx } from 'clsx';

/**
 * Komponen GradeBadge untuk merender antarmuka pengguna.
 * @param {Object} props - Properti untuk komponen ini.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export const GradeBadge = ({ grade, className }) => {
  const styles = {
    A: "bg-emerald-100 text-emerald-800 border-emerald-300",
    B: "bg-amber-100 text-amber-800 border-amber-300",
    C: "bg-rose-100 text-rose-800 border-rose-300",
  };

  const labels = {
    A: "Grade A (Sangat Sehat)",
    B: "Grade B (Cukup Sehat)",
    C: "Grade C (Perlu Perbaikan)",
  };

  const colors = {
    A: "bg-emerald-500",
    B: "bg-amber-500",
    C: "bg-rose-500",
  }

  if (!grade) return null;

  return (
    <span className={clsx("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-sm bg-white/90 backdrop-blur-sm", styles[grade], className)}>
      <span className={clsx("w-2 h-2 rounded-full animate-pulse", colors[grade])}></span>
      {labels[grade]}
    </span>
  );
};
