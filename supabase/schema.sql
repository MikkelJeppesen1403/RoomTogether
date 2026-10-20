-- RoomTogether database (Supabase / Postgres)
-- Kør hele filen i Supabase: SQL Editor -> New query -> indsæt -> Run.
-- Login håndteres af Supabase Auth; denne fil laver tabellerne og hvem der må se/ændre hvad.

-- Profiler: én række pr. bruger, oprettes automatisk ved tilmelding
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  name text not null default '',
  role text not null default 'seeker' check (role in ('seeker', 'host', 'admin')),
  bio text default '',
  age int,
  work text default '',
  budget int default 0,
  area text default '',
  move_in date,
  photo_url text,
  habits jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles on delete cascade,
  title text not null,
  area text not null,
  rent int not null,
  deposit int default 0,
  size int,
  move_in date,
  period text default '',
  description text default '',
  image_url text,
  habits jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.favorites (
  user_id uuid not null references public.profiles on delete cascade,
  listing_id uuid not null references public.listings on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, listing_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  from_id uuid not null references public.profiles on delete cascade,
  to_id uuid not null references public.profiles on delete cascade,
  listing_id uuid references public.listings on delete set null,
  text text not null check (length(text) between 1 and 4000),
  created_at timestamptz not null default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles on delete cascade,
  listing_id uuid references public.listings on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);

create index on public.listings (area);
create index on public.messages (from_id, to_id, created_at);

-- Hjælpefunktion: er den indloggede bruger admin?
create function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin')
$$;

-- Lav en profil automatisk når nogen opretter sig
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    case when new.raw_user_meta_data->>'role' = 'host' then 'host' else 'seeker' end
  );
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Sikkerhed (Row Level Security): hvem må hvad
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.favorites enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;

-- Profiler kan ses af indloggede brugere; man retter kun sin egen (og kan ikke gøre sig selv til admin)
create policy "profiler ses af indloggede" on public.profiles
  for select to authenticated using (true);
create policy "ret egen profil" on public.profiles
  for update to authenticated using (id = auth.uid())
  with check (id = auth.uid() and role <> 'admin' or public.is_admin());

-- Opslag er offentlige; kun udlejere/admin opretter, og man retter/sletter kun sine egne
create policy "opslag er offentlige" on public.listings
  for select using (true);
create policy "udlejer opretter opslag" on public.listings
  for insert to authenticated with check (
    user_id = auth.uid()
    and exists (select 1 from profiles where id = auth.uid() and role in ('host', 'admin'))
  );
create policy "ret eget opslag" on public.listings
  for update to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "slet eget opslag" on public.listings
  for delete to authenticated using (user_id = auth.uid() or public.is_admin());

-- Favoritter er private
create policy "egne favoritter" on public.favorites
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Beskeder ses kun af afsender og modtager
create policy "se egne beskeder" on public.messages
  for select to authenticated using (from_id = auth.uid() or to_id = auth.uid());
create policy "send besked" on public.messages
  for insert to authenticated with check (from_id = auth.uid());

-- Anmeldelser: alle indloggede kan anmelde, kun admin kan læse
create policy "anmeld opslag" on public.reports
  for insert to authenticated with check (reporter_id = auth.uid());
create policy "admin ser anmeldelser" on public.reports
  for select to authenticated using (public.is_admin());

-- Beskeder i realtid
alter publication supabase_realtime add table public.messages;

-- Billeder til opslag og profiler
insert into storage.buckets (id, name, public) values ('billeder', 'billeder', true);
create policy "upload egne billeder" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'billeder' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "billeder er offentlige" on storage.objects
  for select using (bucket_id = 'billeder');
