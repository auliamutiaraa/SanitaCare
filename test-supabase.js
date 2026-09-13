import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length > 0) {
    env[key.trim()] = values.join('=').trim();
  }
});

const supabaseUrl = env['VITE_SUPABASE_URL'];
const supabaseKey = env['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('mockproject')) {
  console.log('❌ URL atau Key masih menggunakan nilai mock atau kosong. Pastikan sudah diganti dengan kredensial asli.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSupabase() {
  console.log('🔄 Mengecek koneksi ke Supabase...');
  try {
    // Check database connection by fetching a single row
    const { data, error } = await supabase.from('canteens').select('*').limit(1);
    if (error) {
      console.log('❌ Koneksi Database Gagal:', error.message);
    } else {
      console.log('✅ Koneksi Database Berhasil! (Tabel canteens dapat diakses)');
    }

    // Check storage bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket('sanitacare-bucket');
    if (bucketError) {
      console.log('❌ Storage Bucket "sanitacare-bucket" bermasalah atau belum dibuat:', bucketError.message);
    } else {
      console.log('✅ Storage Bucket "sanitacare-bucket" tersedia dan siap digunakan!');
      if (bucketData.public) {
        console.log('✅ Status Bucket: PUBLIC (Sudah benar)');
      } else {
        console.log('⚠️ Peringatan: Bucket dibuat, tapi belum diset PUBLIC.');
      }
    }
  } catch (err) {
    console.log('❌ Terjadi kesalahan tak terduga:', err.message);
  }
}

checkSupabase();
