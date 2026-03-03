-- Create a table for ratings
create table if not exists class_ratings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now() not null,
  stars integer check (stars >= 1 and stars <= 5) not null,
  observations text,
  user_name text
);

-- Note: In Supabase, make sure to enable Row Level Security (RLS) 
-- and create a policy to allow public inserts if you want to allow anonymous submissions.
-- alter table class_ratings enable row level security;
-- create policy "Allow public insert" on class_ratings for insert with check (true);
