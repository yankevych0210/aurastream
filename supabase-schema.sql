-- NextAuth.js required tables for @auth/supabase-adapter
-- Run this in Supabase SQL Editor

create table if not exists users (
  id uuid not null default gen_random_uuid(),
  name text,
  email text unique,
  "emailVerified" timestamptz,
  image text,
  primary key (id)
);

create table if not exists accounts (
  id uuid not null default gen_random_uuid(),
  "userId" uuid not null references users(id) on delete cascade,
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  primary key (id),
  unique (provider, "providerAccountId")
);

create table if not exists sessions (
  id uuid not null default gen_random_uuid(),
  "sessionToken" text not null unique,
  "userId" uuid not null references users(id) on delete cascade,
  expires timestamptz not null,
  primary key (id)
);

create table if not exists verification_tokens (
  identifier text not null,
  token text not null unique,
  expires timestamptz not null,
  primary key (identifier, token)
);

-- Enable Row Level Security
alter table users enable row level security;
alter table accounts enable row level security;
alter table sessions enable row level security;
alter table verification_tokens enable row level security;

-- Allow service_role full access (needed for NextAuth adapter)
create policy "Service role can manage users" on users
  for all using (auth.role() = 'service_role');

create policy "Service role can manage accounts" on accounts
  for all using (auth.role() = 'service_role');

create policy "Service role can manage sessions" on sessions
  for all using (auth.role() = 'service_role');

create policy "Service role can manage verification_tokens" on verification_tokens
  for all using (auth.role() = 'service_role');
