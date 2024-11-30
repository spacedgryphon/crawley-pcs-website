create table "public"."consultations" (
  "id" uuid not null default uuid_generate_v4(),
  "created_at" timestamp with time zone default timezone('utc'::text, now()),
  "name" text not null,
  "email" text not null,
  "phone" text not null,
  "requirements" text,
  "date" date not null,
  "time" time not null,
  "status" text not null default 'pending'::text,
  constraint "consultations_pkey" primary key ("id"),
  constraint "consultations_status_check" 
    check (status in ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Create indexes for better query performance
create index "idx_consultations_status" on "public"."consultations" ("status");
create index "idx_consultations_created_at" on "public"."consultations" ("created_at");

-- Set up Row Level Security (RLS)
alter table "public"."consultations" enable row level security;

-- Create policies
create policy "Enable read access for authenticated users only"
  on "public"."consultations"
  for select
  to authenticated
  using (true);

create policy "Enable insert access for all users"
  on "public"."consultations"
  for insert
  to anon, authenticated
  with check (true);

create policy "Enable update access for authenticated users only"
  on "public"."consultations"
  for update
  to authenticated
  using (true);