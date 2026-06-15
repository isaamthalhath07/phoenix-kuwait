# Phoenix Kuwait

A bilingual (English / Arabic) website for **Phoenix Kuwait**, a construction and
contracting company. Includes a public marketing site with dynamic animations and an
authenticated admin dashboard for publishing projects.

- **Frontend:** React + TypeScript + Vite, Tailwind CSS v4, Framer Motion
- **i18n / RTL:** i18next (full English + Arabic, automatic right-to-left layout)
- **Backend:** Supabase (Postgres, Auth, Storage)
- **Hosting:** Netlify (SPA + Netlify Forms for the contact form)

## Features

- Fully bilingual EN/AR with one-click language switch and RTL support
- Animated, responsive landing page (hero embers, scroll reveals, animated counters)
- Projects portfolio with category filtering and per-project detail pages + galleries
- Secure admin dashboard to create / edit / delete / publish projects in both languages
- Image uploads to Supabase Storage
- Contact form via Netlify Forms

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev
```

### Environment variables

| Variable                  | Where to find it                              |
| ------------------------- | --------------------------------------------- |
| `VITE_SUPABASE_URL`       | Supabase dashboard -> Project Settings -> API |
| `VITE_SUPABASE_ANON_KEY`  | Supabase dashboard -> Project Settings -> API |

The site renders without these (projects simply appear empty), but the admin
dashboard and live data require them.

## Supabase setup

1. Create a Supabase project.
2. Apply the schema in [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
   (via the SQL editor or the Supabase CLI). It creates the `projects` table, the
   `admins` allowlist, row-level security policies, and the `project-images` storage bucket.
3. Create your admin user (Dashboard -> Authentication -> Users -> Add user), then add
   them to the allowlist so they can manage content:

   ```sql
   insert into public.admins (user_id)
   values ('<the-new-user-uuid>');
   ```

4. (Recommended) Disable public sign-ups under Authentication -> Providers -> Email.

The admin dashboard lives at `/admin/login`.

## Deployment (Netlify)

- Build command: `npm run build`
- Publish directory: `dist`
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in
  Netlify (Site configuration -> Environment variables).

`netlify.toml` already configures the SPA redirect, asset caching and security headers.

## Project structure

```
src/
  components/      UI, layout, sections, animation primitives
  hooks/           auth, locale, data fetching, document meta
  i18n/            i18next config + en/ar locale resources
  lib/             supabase client, data access, types, constants
  pages/           public pages + admin/*
supabase/migrations/  database schema
```

## Customisation

Business details (phone, email, address, social links) live in
[`src/lib/constants.ts`](src/lib/constants.ts). All copy is in
[`src/i18n/locales`](src/i18n/locales).
