-- Migration: 0007_listing_proofs

-- 0. Create Storage Bucket
insert into storage.buckets (id, name, public) 
values ('proofs', 'proofs', false)
on conflict do nothing;

-- 1. Create listing_proofs table
create table public.listing_proofs (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  uploaded_by uuid references public.profiles(id) not null,
  proof_type text not null check (proof_type in ('revenue', 'traffic', 'ownership', 'other')),
  source text not null, -- e.g. Stripe, GA, Custom
  file_url text not null, -- Path in Supabase Storage
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable RLS
alter table public.listing_proofs enable row level security;

-- 3. Policies for listing_proofs

-- Policy: Sellers can view proofs for their own listings
create policy "Sellers can view own listing proofs"
  on public.listing_proofs for select
  using ( auth.uid() = uploaded_by );

-- Policy: Sellers can insert proofs for their own listings
create policy "Sellers can insert own listing proofs"
  on public.listing_proofs for insert
  with check ( auth.uid() = uploaded_by );

-- Policy: NDA signers can view proofs
create policy "NDA signers can view proofs"
  on public.listing_proofs for select
  using (
    exists (
      select 1 from public.nda_acceptances
      where listing_id = listing_proofs.listing_id
      and user_id = auth.uid()
    )
  );

-- Policy: Admins can view and manage all proofs
create policy "Admins can view all proofs"
  on public.listing_proofs for select
  using ( public.is_admin() );

create policy "Admins can manage all proofs"
  on public.listing_proofs for all
  using ( public.is_admin() );

-- 4. Storage Setup (Policies for 'proofs' bucket)
-- Note: Bucket itself should be created in Supabase Dashboard or CLI.
-- These policies assume a bucket named 'proofs' exists and is private.

-- Policy: Allow uploads to 'proofs' bucket for authenticated users
-- (In a real app, we might restrict it further to only sellers, but auth.uid() is common for MVP)
-- The file path should ideally be 'listing_id/file_name'

-- Note: Storage policies are in the 'storage' schema.
-- We use 'storage.objects' table.

create policy "Allow uploads to proofs bucket"
on storage.objects for insert
with check (
  bucket_id = 'proofs' 
  and auth.role() = 'authenticated'
);

create policy "Allow owners to view own proofs"
on storage.objects for select
using (
  bucket_id = 'proofs'
  and (
    -- Either you uploaded it
    auth.uid() = owner
    OR 
    -- Or you have signed the NDA for the listing this proof belongs to
    -- This requires a slightly complex join since storage doesn't know about listings directly
    -- We assume the folder name is the listing_id
    exists (
      select 1 from public.nda_acceptances
      where listing_id::text = (storage.foldername(name))[1]
      and user_id = auth.uid()
    )
    OR
    -- Or you are an admin
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and role = 'admin'
    )
  )
);
