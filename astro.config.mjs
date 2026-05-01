import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import astroExpressiveCode from 'astro-expressive-code';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import icon from "astro-icon";
import Font from 'vite-plugin-font';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import mermaid from './src/plugins/mermaid.mjs';
import rehypeLazyLoadImage from './src/plugins/lazyLoadImage.mjs';

// 取得當前目錄（相容 ESM）
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 自定義插件：將 :::directive 轉換為可被 CSS 識別的 HTML 結構
function myRemarkDirectiveAutoStyle() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' || node.type === 'leafDirective' || node.type === 'textDirective') {
        const data = node.data || (node.data = {});
        data.hName = 'div';
        data.hProperties = {
          ...data.hProperties,
          'data-directive': node.name,
          class: `directive-${node.name}`
        };
      }
    });
  };
}

// 靜態輸出模式
export default defineConfig({
  site: 'https://blog.ouoxo.com',
  integrations: [
    mermaid(),
    astroExpressiveCode({
      themes: ['github-light', 'github-dark'],
      useDarkModeMediaQuery: false,
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()]
    }),
    sitemap(),
    mdx(),
    icon()
  ],
  output: 'static',
  server: {
    host: true
  },
  markdown: {
    remarkPlugins: [remarkGfm, remarkDirective, myRemarkDirectiveAutoStyle, remarkMath],
    rehypePlugins: [rehypeKatex, rehypeLazyLoadImage],
    syntaxHighlight: false
  },
  i18n: {
    defaultLocale: 'zh-tw',
    locales: ['zh-tw', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: true,
  image: {
    domains: ['images.unsplash.com', 'i.imgur.com', 'drive.google.com'],
    remotePatterns: [{ protocol: 'https', hostname: '**.googleusercontent.com' }],
  },
  vite: {
    resolve: {
      // 強制使用絕對路徑，繞過 Windows 路徑大小寫/分隔符號不一致的問題
      // 這修復了 Astro v6 + tsconfig path aliases + Windows 環境下，
      // Vite CSS 虛擬模組快取 key 不一致所導致的 "No cached compile metadata found" 錯誤
      alias: {
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@components': path.resolve(__dirname, './src/components'),
        '@styles': path.resolve(__dirname, './src/styles'),
      }
    },
    plugins: [
      Font.vite({
        scanFiles: ['src/**/*.{ts,tsx,js,jsx,md,mdx,astro,yml}']
      }),
    ]
  }
});
