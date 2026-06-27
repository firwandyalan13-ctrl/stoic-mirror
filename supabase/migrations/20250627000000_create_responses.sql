create table responses (
  id uuid primary key default gen_random_uuid(),
  d1 int not null check (d1 between 4 and 16),
  d2 int not null check (d2 between 3 and 12),
  d3 int not null check (d3 between 4 and 16),
  d4 int not null check (d4 between 3 and 12),
  d5 int not null check (d5 between 4 and 16),
  created_at timestamptz default now()
);

alter table responses enable row level security;

create policy "anon insert" on responses
  for insert to anon with check (true);

create policy "anon read" on responses
  for select to anon using (true);
