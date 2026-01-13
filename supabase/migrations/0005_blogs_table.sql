-- Migration: 0005_blogs_table

create table public.blogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null, -- Markdown supported
  author_id uuid references public.profiles(id) not null,
  cover_image text,
  
  status text check (status in ('draft', 'published')) default 'published',
  published_at timestamp with time zone default timezone('utc'::text, now()),
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.blogs enable row level security;

-- Public read access
create policy "Public can read published blogs"
  on public.blogs for select
  using ( status = 'published' );

-- Admin full access
create policy "Admins can manage blogs"
  on public.blogs for all
  using ( public.is_admin() );
