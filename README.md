<p align="center">
  <img src="./public/logo-site.png" alt="AuraStream" height="60" />
</p>

<h1 align="center">AuraStream</h1>
<p align="center">
  A premium, Netflix-inspired streaming platform built with Next.js, TypeScript, and Tailwind CSS.
  <br/>
  Powered by TMDB for live content and Supabase for user authentication & persistence.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Supabase-enabled-3ECF8E?style=flat-square&logo=supabase" />
  <img src="https://img.shields.io/badge/Auth-Google OAuth-white?style=flat-square&logo=google" />
</p>

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🌐 **Localization** | Multi-language support (EN, RU, UA) with `useLanguageStore` (Zustand) and cookie-based persistence. |
| 🔐 **Authentication** | Google OAuth via NextAuth v5. User profile sync with Supabase PostgreSQL. |
| 🎬 **Live Content** | Dynamic movie/TV data from TMDB API with real-time language switching. |
| 🖥️ **Video Player** | Premium 4-server embed system with fallback logic and ad-filtering tips. |
| 🔍 **Premium Search** | Real-time multi-search with backdrop blur overlay and trending suggestions. |
| ➕ **My List** | Persistent watchlist across sessions using Zustand and Supabase sync. |
| 📱 **Mobile UI** | Native-like sidebar menu, responsive modals, and touch-optimized player controls. |
| ⚡ **Performance** | Next.js 16 + Turbopack, Framer Motion animations, and Image optimization. |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org/) App Router + Turbopack |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + Outfit (Google Font) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **State** | [Zustand](https://docs.pmnd.rs/zustand/) |
| **Data Fetching** | [TanStack Query v5](https://tanstack.com/query/v5) + Axios |
| **Auth** | [NextAuth.js v5 beta](https://authjs.dev/) — Google Provider, JWT sessions |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Content API** | [TMDB API](https://developer.themoviedb.org/docs) |
| **Player** | [vidsrc.to](https://vidsrc.to/) embed |

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js **18+**
- A [TMDB Read Access Token](https://www.themoviedb.org/settings/api)
- A [Supabase](https://supabase.com/) project
- [Google OAuth credentials](https://console.cloud.google.com/) (Web application)

### 2. Clone & Install

```bash
git clone https://github.com/your-username/aurastream.git
cd aurastream
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in all the required values (see `.env.example` for instructions).

> **Supabase DB schema** — run the following SQL in your Supabase SQL Editor to create the users table:
> ```sql
> create table if not exists public.users (
>   id uuid default gen_random_uuid() primary key,
>   email text unique not null,
>   name text,
>   image text,
>   created_at timestamptz default now()
> );
> alter table public.users enable row level security;
> create policy "service_role full access" on public.users
>   using (true) with check (true);
> ```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Add Google Redirect URI

In [Google Cloud Console](https://console.cloud.google.com/) → OAuth 2.0 credentials, add:
```
http://localhost:3000/api/auth/callback/google
```

---

## 📁 Project Structure

```
aurastream/
├── app/                    # Next.js App Router pages
│   ├── (root)/page.tsx     # Home — trending hero + movie rows
│   ├── movies/             # Movies catalog page
│   ├── tv-shows/           # TV Shows catalog page
│   ├── new/                # New & Popular page
│   ├── my-list/            # Saved watchlist page
│   └── search/             # Real-time search page
│
├── components/
│   ├── home/               # HeroBanner, MovieRow, HeroBannerButtons
│   ├── layout/             # Header (sticky, animated)
│   ├── modals/             # MovieModal (player + details), AuthModal
│   ├── search/             # SearchClient (real-time)
│   └── shared/             # MovieCard, Skeletons
│
├── lib/
│   └── api/                # TMDB Axios client & service functions
│
├── store/                  # Zustand stores (modal, my-list)
├── types/                  # TypeScript interfaces (TMDB types)
├── auth.ts                 # NextAuth config (Google + JWT + Supabase sync)
└── public/                 # Logo, favicon
```

---

## 🔑 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `TMDB_API_KEY` | ✅ | TMDB Read Access Token (server-side) |
| `NEXT_PUBLIC_TMDB_API_KEY` | ✅ | Same token (client-side components) |
| `AUTH_GOOGLE_ID` | ✅ | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | ✅ | Google OAuth Client Secret |
| `AUTH_SECRET` | ✅ | NextAuth secret (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key |
| `SUPABASE_URL` | ✅ | Supabase project URL (server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key — **keep secret!** |

---

## 📄 License

This project is for **educational purposes only**.  
Content and metadata are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).  
Video streams are served by third-party embed providers.
