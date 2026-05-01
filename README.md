# Minimal Static Personal Blog

This project is an extremely simple personal blog built with [Astro](https://astro.build/).
It is designed to be fully static, containing **no dynamic code**, to ensure maximum performance, security, and simplicity.

## 🚀 Project Structure

Inside this Astro project, you'll see the following structure:

```text
/
├── public/             # Static assets that are served directly
├── src/
│   ├── assets/         # Project assets like images and fonts
│   ├── components/     # Reusable Astro UI components
│   ├── content/        # Content collections
│   │   └── blog/       # Markdown files for blog posts
│   │       ├── en/     # English posts
│   │       └── zh-tw/  # Traditional Chinese posts
│   ├── i18n/           # Internationalization routing and utilities
│   ├── languages/      # Language dictionaries (e.g., en.ts, zh-tw.ts)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages and routing
│   │   ├── en/         # English pages routing
│   │   └── ...         # Default (zh-tw) routing
│   ├── plugins/        # Custom Astro/Markdown plugins
│   ├── styles/         # Global styles (CSS, Stylus)
│   └── utils/          # Utility functions
├── astro.config.mjs    # Astro configuration file
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
