import { getCollection } from 'astro:content';
import { stripHTML } from '../utils/stripHTML';

export async function GET() {
  const allPosts = await getCollection('blog');

  // 建立精簡版索引以供前端搜尋
  const index = allPosts.map(post => {
    const lang = post.id.split('/')[0]; // zh-tw 或 en
    const slug = post.id.replace(/\.mdx?$/, '').replace(/^(zh-tw|en)\//, '');

    // 使用已渲染的 HTML 提取純文字，避免洩漏 Markdown 原始語法或草稿標記
    // 若文章尚未渲染（rendered 為 undefined）則 fallback 為空字串
    const plainText = post.rendered?.html
      ? stripHTML(post.rendered.html).replace(/\s+/g, ' ').trim()
      : '';

    return {
      title: post.data.title,
      category: post.data.category || 'Post',
      slug: slug,
      lang: lang,
      // 僅保留前 300 字元，純文字已無冗餘語法，長度可縮短以減小索引體積
      content: plainText.toLowerCase().substring(0, 300),
      url: lang === 'en' ? `/en/posts/${slug}` : `/posts/${slug}`
    };
  });

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
