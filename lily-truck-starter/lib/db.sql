-- === Lily Truck – Schéma de données (Supabase/Postgres) ===

create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text,
  full_name text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort int default 0
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  name text not null,
  description text,
  price_cents int not null,
  image_url text,
  is_active boolean default true,
  sort int default 0
);

create table if not exists option_groups (
  id uuid primary key default gen_random_uuid(),
  menu_item_id uuid references menu_items(id) on delete cascade,
  name text not null,
  min_select int default 0,
  max_select int default 1
);

create table if not exists options (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references option_groups(id) on delete cascade,
  name text not null,
  price_delta_cents int default 0
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  public_id text unique not null default encode(gen_random_bytes(9), 'base64'),
  status text not null default 'received',
  subtotal_cents int not null,
  fees_cents int not null default 0,
  total_cents int not null,
  payment_status text default 'unpaid',
  pickup_slot timestamptz,
  channel text default 'web',
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id),
  qty int not null,
  unit_price_cents int not null,
  notes text
);

create table if not exists order_item_options (
  order_item_id uuid references order_items(id) on delete cascade,
  option_id uuid references options(id) on delete restrict,
  price_delta_cents int not null,
  primary key (order_item_id, option_id)
);

create table if not exists order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  status text not null,
  changed_by uuid references users(id),
  created_at timestamptz default now()
);

create table if not exists loyalty_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  order_id uuid references orders(id) on delete set null,
  points int not null,
  type text check (type in ('earn','redeem')),
  created_at timestamptz default now()
);

-- RLS (activer au besoin côté Supabase UI)
-- alter table orders enable row level security;
-- Policies exemples:
-- create policy "own orders by user" on orders for select using (auth.uid() = user_id);
-- create policy "public tracking by public_id" on orders for select using (true); -- affiner avec URL signée
