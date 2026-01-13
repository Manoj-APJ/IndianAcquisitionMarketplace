-- Migration: 0001_flexible_roles
-- Note: This is idempotent and can be run safely.

-- 1. Update the default role logic in the trigger function to be 'buyer' (effectively 'user')
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
    coalesce(new.raw_user_meta_data->>'role', 'buyer'), -- Default to buyer
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;
