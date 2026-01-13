-- Migration: 0002_listings_table

-- Create Listings Table
create table public.listings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) not null,
  title text not null,
  short_description text not null,
  description text not null,
  listing_type text not null, -- 'SaaS', 'Newsletter', 'Community', 'E-commerce', etc.
  price numeric not null,
  monthly_revenue numeric not null,
  tech_stack text[] default '{}',
  
  -- Listing Status Lifecycle
  status text check (status in ('draft', 'submitted', 'approved', 'rejected', 'live', 'sold')) default 'draft',
  
  -- Key metrics
  founded_date date,
  customers_count integer default 0,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.listings enable row level security;

-- Policies

-- 1. Public can view 'live' listings
create policy "Public can view live listings"
  on public.listings for select
  using ( status = 'live' );

-- 2. Sellers can view/edit their own listings (any status)
create policy "Sellers can view own listings"
  on public.listings for select
  using ( auth.uid() = user_id );

create policy "Sellers can insert own listings"
  on public.listings for insert
  with check ( auth.uid() = user_id );

create policy "Sellers can update own listings"
  on public.listings for update
  using ( auth.uid() = user_id );

-- 3. Admins can view/edit all (We'll assume admin check is via role in profiles)
-- For now, we'll keep it simple. If we had an admin role check function:
-- create policy "Admins can do everything" on public.listings using ( public.is_admin() );
