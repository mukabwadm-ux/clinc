-- Blogs & Articles
-- Run once in the Supabase SQL editor (Dashboard → SQL → New query).
-- Images reuse the existing public "product-images" storage bucket, so no
-- new bucket is needed.

create table if not exists public.posts (
  id                uuid primary key default gen_random_uuid(),
  type              text not null default 'blog' check (type in ('blog', 'article')),
  status            text not null default 'draft' check (status in ('draft', 'published')),

  title             text not null,
  slug              text not null unique,
  excerpt           text not null default '',
  content           text not null default '',
  category          text not null default 'General',
  tags              text[] not null default '{}',
  author_name       text not null default 'Clin Corp Technical Team',

  cover_image_url   text,
  cover_image_alt   text,

  -- SEO
  meta_title        text,
  meta_description  text,
  focus_keyword     text,
  canonical_url     text,
  noindex           boolean not null default false,
  faqs              jsonb not null default '[]'::jsonb,

  reading_minutes   integer not null default 1,
  is_featured       boolean not null default false,

  -- A future published_at schedules the post: it stays hidden until then.
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists posts_public_idx   on public.posts (status, published_at desc);
create index if not exists posts_type_idx     on public.posts (type);
create index if not exists posts_category_idx on public.posts (category);

-- Row Level Security: the public (anon) key may only read live posts.
-- The admin API uses the service-role key, which bypasses RLS.
alter table public.posts enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());
