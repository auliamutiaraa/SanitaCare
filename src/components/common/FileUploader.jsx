import React, { useState, useRef } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';

/**
 * Komponen FileUploader untuk merender antarmuka pengguna.
 * @param {Object} props - Properti untuk komponen ini.
 * @returns {JSX.Element} Elemen React yang dikembalikan.
 */
export const FileUploader = ({ onFileSelect, accept = "image/*", maxSizeMB = 5 }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleFile = (file) => {
    setError('');
    if (!file) return;

    // Validasi tipe
    if (!file.type.startsWith('image/')) {
      setError('Harap unggah file gambar yang valid.');
      return;
    }

    // Validasi ukuran
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Ukuran file maksimal ${maxSizeMB}MB.`);
      return;
    }

    // Buat URL preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    // Callback ke parent
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div className="w-full">
      <div 
        className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center
          ${dragActive ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}
          ${preview ? 'border-none p-0 bg-transparent' : ''}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input 
          ref={inputRef}
          type="file" 
          accept={accept}
          onChange={handleChange} 
          className="hidden" 
        />
        
        {preview ? (
          <div className="relative rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
            <button
              type="button"
              onClick={removeFile}
              className="absolute top-2 right-2 p-1.5 bg-rose-500/80 hover:bg-rose-600 text-white rounded-lg backdrop-blur-sm transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-xs font-medium truncate flex items-center gap-1">
                <ImageIcon className="w-3 h-3" /> Siap diunggah
              </p>
            </div>
          </div>
        ) : (
          <div 
            className="cursor-pointer flex flex-col items-center justify-center py-4"
            onClick={() => inputRef.current?.click()}
          >
            <div className="w-12 h-12 mb-3 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1">
              Klik untuk memilih atau seret & lepas file di sini
            </p>
            <p className="text-xs text-slate-500">
              Mendukung PNG, JPG, JPEG (Maks. {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-rose-500 font-medium">{error}</p>}
    </div>
  );
};
