---
title: "Astro Minimal Static Personal Blog Template"
pubDate: 2026-05-02
category: "Dev"
tags: ["Astro", "Template", "Blog", "Static"]
---

# Astro Minimal Static Personal Blog Template

This project is an extremely simple personal blog built with [Astro](https://astro.build/).
It is designed to be fully static, containing **no dynamic code**, to ensure maximum performance, security, and simplicity.

## 🚀 Project Structure

Inside this Astro project, you'll see the following structure:

```text
/
├── public/             # Static assets that are served directly
│   ├── images/         # Place your article images here
│   └── logo.ico        # (Required) Replace this with your own favicon
├── src/
│   ├── assets/
│   │   └── images/     # Base layout images
│   │       ├── hero-bg.webp # Replace with your own homepage hero background
│   │       └── logo.webp    # Replace with your own logo image
│   ├── components/     # Reusable Astro UI components
│   ├── content/        # Content collections
│   │   └── blog/       # Markdown files for blog posts
│   │       ├── en/     # English posts
│   │       └── zh-tw/  # Traditional Chinese posts
│   ├── i18n/           # Internationalization routing and utilities
│   ├── languages/      # Language dictionaries (e.g., en.ts, zh-tw.ts)
│   ├── layouts/        # Page layouts (BaseLayout.astro contains main meta settings)
│   ├── pages/          # Astro pages and routing
│   │   ├── en/         # English pages routing (about, disclaimer, privacy, etc.)
│   │   └── ...         # Default (zh-tw) routing (about, disclaimer, privacy, etc.)
│   ├── plugins/        # Custom Astro/Markdown plugins
│   ├── styles/         # Global styles (CSS, Stylus)
│   └── utils/          # Utility functions
├── astro.config.mjs    # Astro configuration file
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🛠️ Getting Started

If you use this template, please remember to modify the following settings to apply your own data.
If you do not fill in or modify them, the website will still run normally and **will not report errors**, it will only display default placeholder text.

1. **Basic Configuration**
   - Open `astro.config.mjs` and replace `site: 'https://example.com'` with your website URL.
   - Open `src/layouts/BaseLayout.astro` and modify the default values for `title` and `description`, as well as the fallback URL for `siteUrl`.

2. **SEO and Tracking Code**
   - Open `src/components/HeadMeta.astro` and replace the Google Analytics tracking ID `G-XXXXXXXXXX` with your actual ID.

3. **Replacing Images and Logo**
   - **Logo & Favicon**: Please upload your own Logo to `public/logo.ico` and `src/assets/images/logo.webp`.
   - **Homepage Background**: Please upload your own background image and overwrite `src/assets/images/hero-bg.webp`.
   - **Article Images**: Please place them under `public/images/` and reference them in your articles using the relative path `/images/...`.

4. **Editing Custom Pages**
   - Please go to the following paths to modify your exclusive content (supports both Chinese and English versions):
     - `src/pages/about.astro` / `src/pages/en/about.astro` (About Me)
     - `src/pages/index.astro` / `src/pages/en/index.astro` (Homepage Intro Text)
     - `src/pages/disclaimer.astro` / `src/pages/en/disclaimer.astro` (Disclaimer)
     - `src/pages/privacy.astro` / `src/pages/en/privacy.astro` (Privacy Policy)
