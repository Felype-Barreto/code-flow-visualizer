export type Language = 'en' | 'pt-BR' | 'es' | 'zh' | 'hi';

export type Translations = Record<string, string>;

const TRANSLATIONS: Record<Language, Translations> = {
  en: { loading: 'Loading...', hello: 'Hello' },
  'pt-BR': { loading: 'Carregando...', hello: 'Olá' },
  es: { loading: 'Cargando...', hello: 'Hola' },
  zh: { loading: '加载中...', hello: '你好' },
  hi: { loading: 'लोड हो रहा है...', hello: 'नमस्ते' },
};

function humanize(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[_-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

export function getTranslation(lang: Language): Translations {
  const base = TRANSLATIONS[lang] ?? TRANSLATIONS.en;
  return new Proxy(base, {
    get(target, prop: string | symbol) {
      if (typeof prop !== 'string') return undefined as any;
      if (prop in target) return (target as any)[prop];
      return humanize(prop);
    },
  });
}

export function getLanguageName(lang: Language): string {
  const map: Record<Language, string> = {
    en: 'English',
    'pt-BR': 'Português (Brasil)',
    es: 'Español',
    zh: '中文',
    hi: 'हिन्दी',
  };
  return map[lang] ?? lang;
}

export {};
