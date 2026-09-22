import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Bagaimana standar penilaian audit kantin di SanitaCare?',
      answer: 'Penilaian didasarkan pada standar sanitasi dari Dinas Kesehatan, mencakup kebersihan tempat, higienitas penjamah makanan, sanitasi alat, penyediaan air bersih, dan pengelolaan limbah. Hasil audit dikonversi menjadi Grade A, B, atau C.'
    },
    {
      question: 'Siapa yang melakukan inspeksi kebersihan kantin?',
      answer: 'Inspeksi dilakukan oleh tim ahli dan mahasiswa Fakultas Kesehatan Masyarakat (FKM) yang telah terlatih, bekerja sama dengan pihak pengelola Universitas Sriwijaya.'
    },
    {
      question: 'Bagaimana cara mahasiswa memberikan ulasan atau review?',
      answer: 'Mahasiswa dapat mendaftar akun di SanitaCare, memilih kantin yang telah dikunjungi, lalu memberikan rating bintang dan ulasan. Fitur unggah foto makanan atau kondisi kantin juga tersedia.'
    },
    {
      question: 'Apakah tenant/pemilik kantin bisa mendaftar mandiri?',
      answer: 'Bisa. Pemilik kantin dapat menghubungi tim SanitaCare atau mengisi form pendaftaran di menu "Daftar Tenant" untuk dijadwalkan inspeksi awal secara gratis.'
    },
    {
      question: 'Berapa lama masa berlaku grade atau sertifikasi kantin?',
      answer: 'Grade berlaku selama 6 bulan. Setelah itu, tim auditor akan melakukan kunjungan ulang (re-audit) untuk memastikan standar higienitas tetap terjaga atau bahkan meningkat.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900">Pertanyaan Umum (FAQ)</h2>
          <p className="text-slate-600 mt-4">
            Temukan jawaban atas pertanyaan yang sering diajukan mengenai SanitaCare.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl overflow-hidden transition-colors ${openIndex === index ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-200 bg-white'}`}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-semibold text-slate-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-emerald-600 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0 ml-4" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-emerald-100/50 mt-1">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
