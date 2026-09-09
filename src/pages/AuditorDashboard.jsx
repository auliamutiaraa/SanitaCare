import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useInspections } from '../hooks/useInspections';
import { useAuth } from '../context/AuthContext';
import { GradeBadge } from '../components/canteen/GradeBadge';
import { FileText, ClipboardList, CheckCircle, XCircle, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AuditorDashboard() {
  const { profile } = useAuth();
  const { inspections, requests, loading, fetchMyInspections, fetchInspectionRequests, updateRequestStatus } = useInspections();
  const [activeTab, setActiveTab] = useState('history');

  useEffect(() => {
    fetchMyInspections();
    fetchInspectionRequests();
  }, [fetchMyInspections, fetchInspectionRequests]);

  const handleApprove = async (id) => {
    const res = await updateRequestStatus(id, 'scheduled');
    if (res.success) {
      toast.success('Pengajuan disetujui untuk dijadwalkan.');
    } else {
      toast.error('Gagal menyetujui pengajuan.');
    }
  };

  const handleReject = async (id) => {
    const res = await updateRequestStatus(id, 'rejected');
    if (res.success) {
      toast.success('Pengajuan ditolak.');
    } else {
      toast.error('Gagal menolak pengajuan.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Auditor</h1>
            <p className="text-slate-600 mt-1">Selamat datang kembali, {profile?.full_name}</p>
          </div>
          <Link 
            to="/dashboard/auditor/create" 
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-5 rounded-xl transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Buat Laporan Audit
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'history' 
                  ? 'border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50/50' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" /> Riwayat Inspeksi
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'requests' 
                  ? 'border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50/50' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ClipboardList className="w-4 h-4" /> Pengajuan Tenant
              {requests.filter(r => r.status === 'pending').length > 0 && (
                <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {requests.filter(r => r.status === 'pending').length}
                </span>
              )}
            </button>
          </div>

          <div className="p-0">
            {loading ? (
              <div className="p-12 text-center text-slate-500">Memuat data...</div>
            ) : activeTab === 'history' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Tanggal</th>
                      <th className="px-6 py-4 font-semibold">Kantin & Lokasi</th>
                      <th className="px-6 py-4 font-semibold">Skor Total</th>
                      <th className="px-6 py-4 font-semibold">Grade</th>
                      <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {inspections.length > 0 ? inspections.map(insp => (
                      <tr key={insp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(insp.inspected_at).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">{insp.canteens?.name}</p>
                          <p className="text-xs text-slate-500">{insp.canteens?.faculty_location}</p>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">{insp.total_score}</td>
                        <td className="px-6 py-4">
                          <GradeBadge grade={insp.grade} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link to={`/canteens/${insp.canteen_id}`} className="text-emerald-600 font-medium hover:underline text-sm">Lihat Detail</Link>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                          Anda belum memiliki riwayat inspeksi.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-900">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Tanggal Pengajuan</th>
                      <th className="px-6 py-4 font-semibold">Kantin</th>
                      <th className="px-6 py-4 font-semibold">Pemilik</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {requests.length > 0 ? requests.map(req => (
                      <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(req.requested_at).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">{req.canteens?.name}</p>
                          <p className="text-xs text-slate-500">{req.canteens?.faculty_location}</p>
                        </td>
                        <td className="px-6 py-4">{req.profiles?.full_name}</td>
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
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          {req.status === 'pending' && (
                            <>
                              <button onClick={() => handleApprove(req.id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Setujui">
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button onClick={() => handleReject(req.id)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Tolak">
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          {req.status === 'scheduled' && (
                            <Link to={`/dashboard/auditor/create?request_id=${req.id}&canteen_id=${req.canteen_id}`} className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100">
                              Mulai Audit
                            </Link>
                          )}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                          Belum ada pengajuan inspeksi dari tenant.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
