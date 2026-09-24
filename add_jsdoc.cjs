const fs = require('fs');
const path = require('path');

const dirs = ['src/components', 'src/pages', 'src/hooks', 'src/services'];

function generateJSDoc(name, type, hasProps = false) {
  let doc = '/**\n';
  if (type === 'component') {
    doc += ` * Komponen ${name} untuk merender antarmuka pengguna.\n`;
    if (hasProps) {
      doc += ` * @param {Object} props - Properti untuk komponen ini.\n`;
    }
    doc += ` * @returns {JSX.Element} Elemen React yang dikembalikan.\n`;
  } else if (type === 'hook') {
    doc += ` * Custom hook ${name} untuk mengelola logika dan state terkait.\n`;
    doc += ` * @returns {Object} State dan fungsi helper yang dapat digunakan komponen.\n`;
  } else if (type === 'service') {
    doc += ` * Modul layanan ${name} untuk interaksi dengan API/Supabase.\n`;
  } else {
    doc += ` * Fungsi ${name}.\n`;
  }
  doc += ' */\n';
  return doc;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let changed = false;

  const type = filePath.includes('components') || filePath.includes('pages') ? 'component' :
               filePath.includes('hooks') ? 'hook' : 'service';

  // Match: export default function Name(props)
  content = content.replace(/(?<!\/\*\*\n[\s\S]*?\*\/[\s\n]*)(export default function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*\{)/g, (match, def, name, args) => {
    changed = true;
    return generateJSDoc(name, type, args.trim().length > 0) + def;
  });

  // Match: export function Name(props)
  content = content.replace(/(?<!\/\*\*\n[\s\S]*?\*\/[\s\n]*)(export function\s+([A-Za-z0-9_]+)\s*\(([^)]*)\)\s*\{)/g, (match, def, name, args) => {
    changed = true;
    return generateJSDoc(name, type, args.trim().length > 0) + def;
  });

  // Match: export const Name = (props) =>
  content = content.replace(/(?<!\/\*\*\n[\s\S]*?\*\/[\s\n]*)(export const\s+([A-Za-z0-9_]+)\s*=\s*(?:async\s*)?\(([^)]*)\)\s*=>)/g, (match, def, name, args) => {
    if (name === 'supabase') return def; // Skip supabase client itself if handled differently
    changed = true;
    return generateJSDoc(name, type, args.trim().length > 0) + def;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Added JSDoc to ${filePath}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

dirs.forEach(walk);
