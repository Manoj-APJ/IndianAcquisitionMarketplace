-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text check (role in ('buyer', 'seller', 'both', 'admin')) default 'buyer',
  full_name text,
  avatar_url text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- AUDIT LOGS TABLE
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null, -- 'listing', 'offer', 'deal', 'auth'
  entity_id text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Audit Logs
alter table public.audit_logs enable row level security;

-- Policies for Audit Logs
create policy "Users can view their own audit logs"
  on audit_logs for select
  using ( auth.uid() = user_id );

-- Only system/admin (or triggers) should insert audit logs usually, 
-- but for MVP we might allow authenticated users to log specific actions if needed.
-- secure approach: use a database function to insert logs.

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, full_name, avatar_url)
  values (
    new.id, 
    new.email, 
    coalesce(new.raw_user_meta_data->>'role', 'buyer'), -- Default to buyer if not specified
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
