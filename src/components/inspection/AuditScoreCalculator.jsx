import React, { useState, useEffect } from 'react';
import { GradeBadge } from '../canteen/GradeBadge';

export const AuditScoreCalculator = ({ onScoreChange }) => {
  const [water, setWater] = useState(0);
  const [waste, setWaste] = useState(0);
  const [food, setFood] = useState(0);

  const [total, setTotal] = useState(0);
  const [grade, setGrade] = useState('C');

  // Kalkulasi otomatis setiap kali skor komponen berubah
  useEffect(() => {
    const calculatedTotal = Math.round((Number(water) + Number(waste) + Number(food)) / 3);
    setTotal(calculatedTotal);

    let newGrade = 'C';
    if (calculatedTotal >= 85) newGrade = 'A';
    else if (calculatedTotal >= 70) newGrade = 'B';
    
    setGrade(newGrade);

    // Kirim data kembali ke parent form
    if (onScoreChange) {
      onScoreChange({
        score_water: Number(water),
        score_waste: Number(waste),
        score_food_handling: Number(food),
        total_score: calculatedTotal,
        grade: newGrade,
      });
    }
  }, [water, waste, food, onScoreChange]);

  const ScoreSlider = ({ label, value, setter, colorClass }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <span className={`text-sm font-bold ${colorClass}`}>{value} / 100</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => setter(e.target.value)}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
      />
    </div>
  );

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-6">
      <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-3">Kalkulator Skor Sanitasi</h3>
      
      <div className="space-y-5">
        <ScoreSlider 
          label="1. Sanitasi Air & Kualitas Fasilitas" 
          value={water} 
          setter={setWater} 
          colorClass="text-blue-600" 
        />
        <ScoreSlider 
          label="2. Pengolahan Sampah & Limbah" 
          value={waste} 
          setter={setWaste} 
          colorClass="text-amber-600" 
        />
        <ScoreSlider 
          label="3. Higienitas Penjamah Makanan" 
          value={food} 
          setter={setFood} 
          colorClass="text-rose-600" 
        />
      </div>

      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-emerald-50">
        <div className="text-center sm:text-left mb-3 sm:mb-0">
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total Skor Rata-Rata</p>
          <p className="text-3xl font-extrabold text-slate-900">{total} <span className="text-sm text-slate-400 font-normal">/ 100</span></p>
        </div>
        <div className="flex flex-col items-center sm:items-end">
          <p className="text-xs text-slate-500 font-medium mb-1">Predikat Grade</p>
          <GradeBadge grade={grade} className="text-sm px-4 py-2" />
        </div>
      </div>
    </div>
  );
};
