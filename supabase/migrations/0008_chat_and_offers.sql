-- Migration: 0008_chat_and_offers

-- 1. CONVERSATIONS
create table public.conversations (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) not null,
  buyer_id uuid references public.profiles(id) not null,
  seller_id uuid references public.profiles(id) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  unique(listing_id, buyer_id)
);

alter table public.conversations enable row level security;

create policy "Users can view their own conversations"
  on public.conversations for select
  using ( auth.uid() = buyer_id or auth.uid() = seller_id );

create policy "Buyers can start conversation if NDA signed"
  on public.conversations for insert
  with check (
    auth.uid() = buyer_id
    and exists (
      select 1 from public.nda_acceptances
      where user_id = auth.uid() and listing_id = conversations.listing_id
    )
  );

-- 2. MESSAGES
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) not null,
  message_text text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.messages enable row level security;

create policy "Conversation participants can view messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations
      where id = messages.conversation_id
      and (buyer_id = auth.uid() or seller_id = auth.uid())
    )
  );

create policy "Conversation participants can send messages"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations
      where id = messages.conversation_id
      and (buyer_id = auth.uid() or seller_id = auth.uid())
    )
  );

-- 3. OFFERS
create table public.offers (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) not null,
  buyer_id uuid references public.profiles(id) not null,
  seller_id uuid references public.profiles(id) not null,
  amount numeric not null check (amount > 0),
  status text not null check (status in ('sent', 'countered', 'accepted', 'rejected', 'withdrawn')) default 'sent',
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.offers enable row level security;

create policy "Users can view offers involved in"
  on public.offers for select
  using ( auth.uid() = buyer_id or auth.uid() = seller_id );

create policy "Buyers can make offers if NDA signed"
  on public.offers for insert
  with check (
    auth.uid() = buyer_id
    and exists (
      select 1 from public.nda_acceptances
      where user_id = auth.uid() and listing_id = offers.listing_id
    )
  );

create policy "Participants can update offer status"
  on public.offers for update
  using ( auth.uid() = buyer_id or auth.uid() = seller_id );
