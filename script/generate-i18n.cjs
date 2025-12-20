const fs = require('fs');
const path = require('path');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(dirent => {
    const p = path.join(dir, dirent.name);
    if (dirent.isDirectory()) return walk(p);
    if (!p.endsWith('.ts') && !p.endsWith('.tsx')) return [];
    return [p];
  });
}

function humanize(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

const files = walk(path.join(__dirname, '..', 'client', 'src'));
const re = /\bt\.([A-Za-z0-9_]+)\b/g;
const keys = new Set();
for (const f of files) {
  try {
    const s = fs.readFileSync(f, 'utf8');
    let m;
    while ((m = re.exec(s)) !== null) keys.add(m[1]);
  } catch (e) {
    // ignore
  }
}
const arr = Array.from(keys).sort();
const en = {};
for (const k of arr) en[k] = humanize(k);

const langs = ['en','pt-BR','es','zh','hi'];
let out = "export type Language = 'en' | 'pt-BR' | 'es' | 'zh' | 'hi';\n\n";
out += 'export type Translations = Record<string,string>;\n\n';
out += 'const TRANSLATIONS: Record<Language, Translations> = {';
for (const lang of langs) {
  out += `\n  '${lang}': {`;
  for (const k of arr) {
    const v = en[k].replace(/\\/g,'\\\\').replace(/\"/g,'\\\"');
    out += `\n    \"${k}\": \"${v}\","`;
  }
  out += '\n  },';
}
out += '\n};\n\n';
out += `export function getTranslation(lang: Language): Translations {\n  return TRANSLATIONS[lang] ?? TRANSLATIONS.en;\n}\n\n`;
out += `export function getLanguageName(lang: Language): string {\n  const map: Record<Language,string> = { en: 'English', 'pt-BR': 'Português (Brasil)', es: 'Español', zh: '中文', hi: 'हिन्दी' };\n  return map[lang] ?? lang;\n}\n\n`;
out += 'export {};\n';

fs.writeFileSync(path.join(__dirname, '..', 'client', 'src', 'lib', 'i18n.ts'), out, 'utf8');
console.log('WROTE client/src/lib/i18n.ts with', arr.length, 'keys');
