// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    category: z.string().default('未分類'), // 新增分類
    tags: z.array(z.string()).default([]),  // 新增標籤陣列
  }),
});

export const collections = { blog };