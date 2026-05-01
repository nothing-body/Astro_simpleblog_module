import { getCollection } from 'astro:content';
import { ui, defaultLang } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return l === defaultLang ? path : `/${l}${path === '/' ? '' : path}`;
  }
}

/**
 * 增強版方案 B：全自動分類對應
 * 透過掃描所有文章，找出中英文版（檔名相同）的文章並建立分類對應關係。
 */
export async function getDynamicCategoryMapping() {
  const allPosts = await getCollection('blog');
  const mapping: Record<string, string> = {};
  
  // 按照檔案路徑（排除語系前綴）進行分組
  const postsByPath: Record<string, { zh?: string; en?: string }> = {};
  
  allPosts.forEach(post => {
    const parts = post.id.split('/');
    if (parts.length < 2) return;
    
    const locale = parts[0];
    const relativePath = parts.slice(1).join('/'); // 核心檔名部分
    
    if (!postsByPath[relativePath]) postsByPath[relativePath] = {};
    
    if (locale === 'zh-tw') postsByPath[relativePath].zh = post.data.category;
    if (locale === 'en') postsByPath[relativePath].en = post.data.category;
  });

  // 建立對應字典
  for (const path in postsByPath) {
    const { zh, en } = postsByPath[path];
    if (zh && en) {
      // 安全檢查：如果同一個分類有不同的翻譯，噴出警告
      if (mapping[zh] && mapping[zh] !== en) {
        console.warn(`[I18N 警告] 分類「${zh}」偵測到多個對應翻譯：「${mapping[zh]}」與「${en}」。請檢核文章 Frontmatter。`);
      }
      mapping[zh] = en;
      mapping[en] = zh;
    }
  }

  return mapping;
}
