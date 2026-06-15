-- ============================================================
-- Phoenix Kuwait — initial schema
-- projects table, admin allowlist, RLS, storage bucket + policies
-- ============================================================

-- ---------- admins allowlist ----------
-- Only user IDs present in this table may create/edit/delete projects,
-- even if other users manage to sign up.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- Admins can see the allowlist; nobody else can.
drop policy if exists "Admins read allowlist" on public.admins;
create policy "Admins read allowlist"
  on public.admins for select
  to authenticated
  using (user_id = auth.uid());

-- Helper: is the current user an admin? (security definer bypasses RLS on admins)
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- projects ----------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  excerpt_en text not null default '',
  excerpt_ar text not null default '',
  content_en text not null default '',
  content_ar text not null default '',
  category text not null default 'residential'
    check (category in ('residential','commercial','infrastructure','renovation','interior','industrial')),
  location_en text not null default '',
  location_ar text not null default '',
  client text,
  year int,
  cover_image_url text,
  gallery jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_status_idx on public.projects (status);
create index if not exists projects_featured_idx on public.projects (featured) where featured = true;
create index if not exists projects_created_idx on public.projects (created_at desc);

alter table public.projects enable row level security;

-- Public can read only published projects.
drop policy if exists "Public read published projects" on public.projects;
create policy "Public read published projects"
  on public.projects for select
  using (status = 'published');

-- Admins can read everything (incl. drafts).
drop policy if exists "Admins read all projects" on public.projects;
create policy "Admins read all projects"
  on public.projects for select
  to authenticated
  using (public.is_admin());

-- Admins can write.
drop policy if exists "Admins insert projects" on public.projects;
create policy "Admins insert projects"
  on public.projects for insert
  to authenticated
  with check (public.is_admin());

drop policy if exists "Admins update projects" on public.projects;
create policy "Admins update projects"
  on public.projects for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins delete projects" on public.projects;
create policy "Admins delete projects"
  on public.projects for delete
  to authenticated
  using (public.is_admin());

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------- storage: project images ----------
insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Anyone can view images.
drop policy if exists "Public read project images" on storage.objects;
create policy "Public read project images"
  on storage.objects for select
  using (bucket_id = 'project-images');

-- Admins can upload / replace / remove images.
drop policy if exists "Admins upload project images" on storage.objects;
create policy "Admins upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins update project images" on storage.objects;
create policy "Admins update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins delete project images" on storage.objects;
create policy "Admins delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images' and public.is_admin());
