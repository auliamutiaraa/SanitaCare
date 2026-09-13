import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTenant } from '../hooks/useTenant';
import { GradeBadge } from '../components/canteen/GradeBadge';
import { Store, CalendarClock, Send, MapPin, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TenantDashboard() {
  const { profile } = useAuth();
  const { myCanteen, myRequests, loading, fetchTenantData, createRequest, registerCanteen } = useTenant();
  
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestNotes, setRequestNotes] = useState('');
  
  const [canteenForm, setCanteenForm] = useState({ name: '', faculty_location: '', description: '' });
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');

  useEffect(() => {
    fetchTenantData();
  }, [fetchTenantData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleRegisterCanteen = async (e) => {
    e.preventDefault();
    const res = await registerCanteen(canteenForm, bannerFile);
    if (res.success) {
      toast.success('Profil Kantin berhasil dibuat!');
    } else {
      toast.error('Gagal membuat profil kantin.');
    }
  };

  const handleRequestAudit = async (e) => {
    e.preventDefault();
    const res = await createRequest(requestNotes);
    if (res.success) {
      toast.success('Pengajuan audit berhasil dikirim!');
      setShowRequestForm(false);
      setRequestNotes('');
    } else {
      toast.error('Gagal mengirim pengajuan: ' + res.error);
    }
  };

  if (loading && !myCanteen) {
    return <div className="p-12 text-center text-slate-500">Memuat data kantin...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Tenant</h1>
          <p className="text-slate-600 mt-1">Kelola kantin Anda, {profile?.full_name}</p>
        </div>

        {!myCanteen ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <Store className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-slate-900">Daftarkan Kantin Anda</h2>
              <p className="text-sm text-slate-500">Lengkapi profil stand/kantin Anda untuk mulai menggunakan sistem SanitaCare.</p>
            </div>
            <form onSubmit={handleRegisterCanteen} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nama Kantin / Stand</label>
                <input required type="text" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" 
                  value={canteenForm.name} onChange={e => setCanteenForm({...canteenForm, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Fakultas / Lokasi</label>
                <input required type="text" className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" 
                  value={canteenForm.faculty_location} onChange={e => setCanteenForm({...canteenForm, faculty_location: e.target.value})} placeholder="Misal: FKM" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Deskripsi Singkat</label>
                <textarea className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none" 
                  value={canteenForm.description} onChange={e => setCanteenForm({...canteenForm, description: e.target.value})} rows="3"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Foto/Gambar Kantin (Opsional)</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="file" accept="image/*" className="block w-full pl-10 rounded-md border border-slate-300 px-3 py-2 focus:border-emerald-500 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" 
                    onChange={handleFileChange} />
                </div>
                <p className="mt-1 text-xs text-slate-500">Kosongkan jika tidak ada. Gambar default akan digunakan jika kosong.</p>
                {bannerPreview && (
                  <div className="mt-3 relative h-32 rounded-lg overflow-hidden border border-slate-200">
                    <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-semibold">Preview Gambar</span>
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-700 mt-2 disabled:opacity-50">
                {loading ? 'Menyimpan...' : 'Simpan Profil Kantin'}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profil Kantin */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-32 bg-slate-800 relative">
                  <img 
                    src={myCanteen.banner_url || 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'} 
                    alt="Banner" 
                    className="w-full h-full object-cover opacity-60" 
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80'; }}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{myCanteen.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                    <MapPin className="w-4 h-4" /> {myCanteen.faculty_location}
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-2">Sertifikasi Saat Ini</p>
                    {myCanteen.current_grade ? (
                      <GradeBadge grade={myCanteen.current_grade} />
                    ) : (
                      <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Belum Diaudit</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-3">{myCanteen.description}</p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-6 text-center">
                <h3 className="font-bold text-emerald-800 mb-2">Butuh Sertifikasi Baru?</h3>
                <p className="text-sm text-emerald-600 mb-4">Ajukan inspeksi ulang untuk meningkatkan Grade sanitasi kantin Anda.</p>
                <button 
                  onClick={() => setShowRequestForm(!showRequestForm)}
                  className="w-full bg-emerald-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  {showRequestForm ? 'Batal' : 'Ajukan Inspeksi'}
                </button>
              </div>
            </div>

            {/* Riwayat Pengajuan */}
            <div className="lg:col-span-2">
              
              {showRequestForm && (
                <div className="bg-white rounded-2xl shadow-sm border border-emerald-200 p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5 text-emerald-600" /> Formulir Pengajuan Inspeksi
                  </h3>
                  <form onSubmit={handleRequestAudit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Catatan Tambahan (Opsional)</label>
                      <textarea 
                        className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:border-emerald-500 focus:outline-none" 
                        rows="3"
                        placeholder="Misal: Kami baru saja merenovasi dapur, mohon diaudit ulang."
                        value={requestNotes}
                        onChange={(e) => setRequestNotes(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700">
                        Kirim Pengajuan
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-slate-500" />
                  <h3 className="font-bold text-slate-900">Riwayat Pengajuan Inspeksi</h3>
                </div>
                <div className="p-0">
                  {myRequests.length > 0 ? (
                    <table className="w-full text-left text-sm text-slate-600">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Tanggal Diajukan</th>
                          <th className="px-6 py-4 font-semibold">Catatan</th>
                          <th className="px-6 py-4 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {myRequests.map(req => (
                          <tr key={req.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(req.requested_at).toLocaleDateString('id-ID')}</td>
                            <td className="px-6 py-4">{req.notes || '-'}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                ${req.status === 'pending' ? 'bg-amber-100 text-amber-800' : ''}
                                ${req.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                                ${req.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : ''}
                                ${req.status === 'rejected' ? 'bg-rose-100 text-rose-800' : ''}
                              `}>
                                {req.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-8 text-center text-slate-500">
                      Anda belum pernah mengajukan inspeksi sanitasi.
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
