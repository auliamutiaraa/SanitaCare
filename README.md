# 🍃 SanitaCare - Sistem Transparansi Sanitasi Kantin Kampus

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)

**SanitaCare** adalah platform digital inovatif (Studi Kasus Universitas Sriwijaya) yang bertujuan menjembatani disiplin ilmu Kesehatan Masyarakat (Kesehatan Lingkungan & Keamanan Pangan) dengan teknologi web modern. Sistem ini memfasilitasi audit kebersihan kantin kampus oleh auditor kesehatan, memberikan transparansi sertifikasi/Grade kepada mahasiswa, serta mewadahi pengajuan inspeksi oleh pemilik kantin (Tenant).

Proyek ini dibangun sebagai tugas Final Project Frontend **Google Developer Groups on Campus (GDGoC) Universitas Sriwijaya**.

---

## ✨ Fitur Utama Berdasarkan Role

Aplikasi ini mengimplementasikan *Role-Based Access Control* (RBAC) yang membagi fitur berdasarkan 3 peran utama:

### 1. 🎓 Mahasiswa / Pengunjung Publik (Student)
- **Eksplorasi Katalog:** Mencari kantin berdasarkan Nama, Filter Grade (A/B/C), dan Dropdown Fakultas.
- **Transparansi Kesehatan:** Melihat hasil audit secara detail, termasuk skor Sanitasi Air, Limbah, Higienitas Penjamah Makanan, dan Foto Bukti Dapur.
- **Ulasan & Rating:** Mahasiswa (yang sudah *login*) dapat memberikan *rating* bintang dan komentar terhadap kantin yang pernah mereka kunjungi.

### 2. 🛡️ Auditor Kesmas (Auditor)
- **Manajemen Pengajuan:** Menerima, Menyetujui (Approve), atau Menolak (Reject) permintaan inspeksi dari pemilik kantin.
- **Kalkulator Audit Otomatis:** Menginput hasil observasi melalui *slider interaktif*. Sistem akan secara instan menghitung rata-rata dan menentukan Grade (A, B, C) secara *real-time*.
- **Upload Dokumentasi:** Mengunggah foto bukti fisik inspeksi ke sistem *Supabase Storage Bucket*.

### 3. 🏪 Pemilik Kantin (Tenant)
- **Registrasi Stand/Kantin:** Mendaftarkan profil kantin lengkap dengan deskripsi dan lokasi ke dalam sistem.
- **Pengajuan Inspeksi Ulang:** Mengajukan permohonan audit (misalnya setelah perbaikan fasilitas) kepada tim Auditor Kesmas untuk meningkatkan Grade sanitasi mereka.

---

## 🛠️ Tech Stack & Architecture

Proyek ini menggunakan arsitektur **Client-Side SPA murni** (*No Backend Server*):
* **Core Framework:** React JS (Bundled with Vite)
* **Styling & UI:** Tailwind CSS, `clsx`, `lucide-react` untuk ikon.
* **State & Form Management:** React Hooks, `react-hook-form` + `zod` schema validation.
* **Routing:** `react-router-dom` v6 dengan Protected Routes.
* **Backend as a Service (BaaS):** Supabase (Authentication, PostgreSQL Database, Storage Bucket & Row Level Security).
* **Deployment:** Vercel

---

## 🚀 Cara Menjalankan Secara Lokal (Local Development)

### Prasyarat
Pastikan Anda sudah menginstal **Node.js** (versi 18+) dan **npm**.

### 1. Kloning Repositori
```bash
git clone https://github.com/username-anda/sanitacare.git
cd sanitacare
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan
1. Duplikat file `.env.example` dan ubah namanya menjadi `.env`.
2. Isi kredensial API Supabase Anda ke dalam file `.env`:
   ```env
   VITE_SUPABASE_URL=https://<id-project-anda>.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJ...
   ```

### 4. Jalankan Server Development
```bash
npm run dev
```
Buka browser dan akses `http://localhost:5173`.

---

## 🧪 Kredensial Akun Demo (Testing Credentials)

Untuk mempermudah proses penilaian, kami telah menyediakan akun demonstrasi dengan role masing-masing:

| Role | Email Login | Password | Keterangan |
| :--- | :--- | :--- | :--- |
| **Auditor** | `auditor@unsri.ac.id` | `sanitacare123` | Akses penuh dashboard audit & input nilai |
| **Tenant** | `tenant@unsri.ac.id` | `sanitacare123` | Akses kelola kantin & request inspeksi |
| **Student** | `student@unsri.ac.id` | `sanitacare123` | Akses beri ulasan bintang & komentar |

*(Catatan: Anda juga dapat mendaftar akun baru menggunakan form registrasi)*

---

## 🏗️ Deployment (Panduan Singkat Vercel)
Aplikasi ini dioptimalkan untuk di-deploy menggunakan platform Vercel. 
- Karena menggunakan Client-Side Routing, kami menyertakan file `vercel.json` berisi `rewrites` ke `/index.html` guna mencegah masalah `404 Not Found` saat me-*refresh* halaman.
- Pastikan memasukkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di bagian **Environment Variables** pada setelan Vercel sebelum melakukan *build*.

---

*Didesain dan dikembangkan dengan ❤️ untuk Final Project GDGoC UNSRI.*
