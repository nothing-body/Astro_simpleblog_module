import type { APIRoute } from 'astro';

const robots = `
User-agent: *
Allow: /

# Block AI and SEO Crawlers
User-agent: AhrefsBot
Disallow: /
User-agent: SemrushBot
Disallow: /
User-agent: MJ12bot
Disallow: /
User-agent: DotBot
Disallow: /
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: Bytespider
Disallow: /
User-agent: Amazonbot
Disallow: /
User-agent: Baiduspider
Disallow: /
User-agent: YandexBot
Disallow: /

User-agent: Googlebot
Allow: /
User-agent: Mediapartners-Google
Allow: /
`.trim();

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site).href;
  return new Response(`${robots}\n\nSitemap: ${sitemapUrl}`, {
    headers: { 'Content-Type': 'text/plain' }
  });
};
