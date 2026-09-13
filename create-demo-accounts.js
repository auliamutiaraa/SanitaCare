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
const supabase = createClient(supabaseUrl, supabaseKey);

const accounts = [
  { email: 'auditor@unsri.ac.id', password: 'sanitacare123', full_name: 'Budi Auditor', role: 'auditor' },
  { email: 'tenant@unsri.ac.id', password: 'sanitacare123', full_name: 'Ibu Kantin', role: 'tenant' },
  { email: 'student@unsri.ac.id', password: 'sanitacare123', full_name: 'Mahasiswa Pintar', role: 'student' }
];

async function createAccounts() {
  console.log('🔄 Sedang membuat akun demo...');
  for (const acc of accounts) {
    const { data, error } = await supabase.auth.signUp({
      email: acc.email,
      password: acc.password,
      options: {
        data: {
          full_name: acc.full_name,
          role: acc.role
        }
      }
    });

    if (error) {
      console.log(`❌ Gagal membuat ${acc.email}:`, error.message);
    } else {
      console.log(`✅ Berhasil membuat akun: ${acc.email} (Role: ${acc.role})`);
    }
  }
  console.log('🎉 Selesai! Silakan coba login sekarang.');
}

createAccounts();
