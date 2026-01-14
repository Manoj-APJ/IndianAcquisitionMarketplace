-- Migration: 0009_add_blog_category
ALTER TABLE public.blogs ADD COLUMN category text DEFAULT 'Uncategorized';
