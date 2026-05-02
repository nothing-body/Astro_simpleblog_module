---
title: "Astro Minimal Static Personal Blog Template"
pubDate: 2026-05-02
category: "開發"
tags: ["Astro", "Template", "Blog", "Static"]
---

# Astro Minimal Static Personal Blog Template

這是一個以 [Astro](https://astro.build/) 構建的極簡靜態個人部落格範本。
專案被設計為完全靜態，不包含動態代碼，以確保最大的效能、安全性與簡潔性。

## 🚀 專案結構 (Project Structure)

在這個 Astro 專案中，你將會看到以下的目錄結構：

```text
/
├── public/             # 直接提供的靜態資源
│   ├── images/         # 請將你的文章圖片放置於此
│   └── logo.ico        # (必須) 請替換成你自己的網站圖示
├── src/
│   ├── assets/
│   │   └── images/     # 基本版面配置圖片
│   │       ├── hero-bg.webp # 請替換成你自己的首頁背景圖
│   │       └── logo.webp    # 請替換成你自己的 Logo 圖片
│   ├── components/     # 可重複使用的 Astro UI 元件
│   ├── content/        # 內容集合 (Content collections)
│   │   └── blog/       # 部落格文章的 Markdown 檔案
│   │       ├── en/     # 英文文章
│   │       └── zh-tw/  # 繁體中文文章
│   ├── i18n/           # 國際化路由與工具程式
│   ├── languages/      # 語言設定檔 (例如：en.ts, zh-tw.ts)
│   ├── layouts/        # 頁面佈局 (BaseLayout.astro 包含主要的中介資料設定)
│   ├── pages/          # Astro 頁面與路由
│   │   ├── en/         # 英文頁面路由 (關於我、免責聲明、隱私權政策等)
│   │   └── ...         # 預設 (繁體中文) 路由
│   ├── plugins/        # 自訂 Astro/Markdown 外掛
│   ├── styles/         # 全域樣式 (CSS, Stylus)
│   └── utils/          # 工具函式
├── astro.config.mjs    # Astro 設定檔
├── package.json        # 專案相依套件與腳本
└── tsconfig.json       # TypeScript 設定檔
```

## 🛠️ 使用者指南 (Getting Started)

如果你使用了這個模板，請記得修改以下設定來套用你自己的資料。
如果您沒有填寫或修改，網站依然能正常運行且**不會報錯**，只會顯示預設的佔位符文案。

1. **基本設定檔**
   - 打開 `astro.config.mjs`，將 `site: 'https://example.com'` 替換為你的網站網址。
   - 打開 `src/layouts/BaseLayout.astro`，修改 `title` 與 `description` 的預設值，以及 `siteUrl` 的 fallback 網址。

2. **SEO 與追蹤碼**
   - 打開 `src/components/HeadMeta.astro`，將 Google Analytics 的 tracking ID `G-XXXXXXXXXX` 替換成你的真實 ID。

3. **替換圖片與 Logo**
   - **Logo & Favicon**: 請上傳你自己的 Logo 到 `public/logo.ico`，以及 `src/assets/images/logo.webp`。
   - **首頁背景圖**: 請上傳你自己的背景圖並覆寫 `src/assets/images/hero-bg.webp`。
   - **文章圖片**: 請放置於 `public/images/` 之下，並在文章中透過 `/images/...` 的相對路徑引用。

4. **編輯自訂頁面**
   - 請至以下路徑修改成你專屬的內容（支援中文與英文版本）：
     - `src/pages/about.astro` / `src/pages/en/about.astro` (關於我)
     - `src/pages/index.astro` / `src/pages/en/index.astro` (首頁簡介文字)
     - `src/pages/disclaimer.astro` / `src/pages/en/disclaimer.astro` (免責聲明)
     - `src/pages/privacy.astro` / `src/pages/en/privacy.astro` (隱私權政策)
