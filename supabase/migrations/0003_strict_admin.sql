-- Migration: 0003_admin_role_and_audit

-- 1. Enum update (if not already supported, usually handled via check constraints)
-- Enforce admin role in profiles is distinct
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check 
  check (role in ('buyer', 'seller', 'both', 'admin'));

-- 2. Create is_admin() function for secure server-side checks
-- This function checks if the requesting user is an admin
create or replace function public.is_admin()
returns boolean
language plpgsql
security definer
as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid()
    and role = 'admin'
  );
end;
$$;

-- 3. Listings Policy Update: Admins can update status
-- First, ensure sellers can ONLY insert 'draft' or 'submitted', not 'live'
drop policy if exists "Admins can view all listings" on public.listings;
create policy "Admins can view all listings"
  on public.listings for select
  using ( public.is_admin() );

drop policy if exists "Admins can update all listings" on public.listings;
create policy "Admins can update all listings"
  on public.listings for update
  using ( public.is_admin() );

-- Update 'Sellers can insert own listings' to force status to be draft or submitted
drop policy if exists "Sellers can insert own listings" on public.listings;
create policy "Sellers can insert own listings"
  on public.listings for insert
  with check ( 
    auth.uid() = user_id 
    and (status = 'draft' or status = 'submitted')
  );

-- Update 'Sellers can update own listings' to prevent moving to 'approved'/'live'
drop policy if exists "Sellers can update own listings" on public.listings;
create policy "Sellers can update own listings"
  on public.listings for update
  using ( auth.uid() = user_id )
  with check (
    status in ('draft', 'submitted') -- Sellers CANNOT set status to 'live' or 'approved'
  );
