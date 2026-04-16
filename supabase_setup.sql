-- ================================================================
-- FreelanceShield - Supabase Database Setup
-- Yeh SQL Supabase ke "SQL Editor" mein run karein
-- ================================================================

-- 1. Profiles table (har user ka pro status)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  is_pro boolean default false,
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Row Level Security enable karein
alter table public.profiles enable row level security;

-- 3. Policies (user sirf apna data dekh sake)
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 4. Service role ko update karne do (payment verification ke liye)
create policy "Service role can update profiles"
  on public.profiles for all
  using (true)
  with check (true);

-- 5. Naye user ke signup par automatically profile banana
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- 6. Trigger lagao
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
